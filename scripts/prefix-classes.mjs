import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const TARGET_DIR_RELATIVE = 'src/lib';

/*
This script prefixes CSS classes in .svelte files within the specified TARGET_DIR_RELATIVE.
It aims to add a "cc:" prefix to classes to avoid conflicts or for organizational purposes.

WHAT IT COVERS:
1.  Static class attributes:
    -   Example: class="foo bar"  =>  class="cc:foo cc:bar"
    -   Example: class='foo bar'  =>  class='cc:foo cc:bar'
    -   Handles existing "cc:" prefixes correctly (won't double-prefix).
        Example: class="foo cc:bar"  =>  class="cc:foo cc:bar"
    -   Preserves leading/trailing whitespace within the attribute value if present.

2.  Dynamic class attributes using the `cn(...)` utility function:
    -   It specifically targets string literal arguments within `cn()` calls.
    -   Example: class={cn("foo", "bar baz", someVariable)}
        => class={cn("cc:foo", "cc:bar cc:baz", someVariable)}
    -   Handles different quote styles for string literals within `cn()`.
    -   Correctly processes `cn()` calls with mixed string literals and variables/expressions.
    -   Preserves spacing within the string literal arguments of `cn()`.

WHAT IT DOESN'T COVER (Intentionally, for simplicity and safety, or due to limitations):
1.  Svelte `class:` directives:
    -   Examples: `class:active`, `class:my-class={isActive}` are NOT modified.

2.  Dynamic `class={...}` attributes NOT using `cn(...)` for string literals:
    -   Template literals with embedded expressions:
        Example: `class={\`foo \${isActive ? 'bar' : 'baz'}\`}` is NOT modified.
    -   Other utility functions or direct JavaScript expressions generating class strings:
        Example: `class={myOtherClassHelper("foo")}` or `class={isActive ? "foo" : "bar"}` are NOT modified.
        The script only introspects string literals passed to `cn()`.

3.  CSS classes defined in `<style>` blocks within Svelte files.
    -   This script only targets `class="..."` and `class={cn(...)}` attributes in the HTML-like template part.

4.  Classes in comments or arbitrary strings elsewhere in the file.

5.  Complex Svelte preprocessor directives or ignores that might affect class compilation.
    The script operates on the raw text content of the .svelte files.

Run this script from the project root. Always back up your files or commit changes before running.
*/

function prefixClassesInString(classString, isProblemFile = false, context = "") {
    const trimmedClassString = classString.trim();
    if (trimmedClassString === '') return classString;

    // Avoid processing strings that are clearly not class lists (e.g., contain function calls like cn())
    if (trimmedClassString.includes('(') || trimmedClassString.includes(')')) {
        if (isProblemFile) {
            console.log(`[DEBUG] prefixClassesInString (${context}): Skipping due to potential function call: '${classString}'`);
        }
        return classString;
    }

    const classes = trimmedClassString.split(/\s+/).filter(c => c.length > 0);
    if (classes.length === 0) return classString;

    const prefixedClasses = classes.map(c => c.startsWith('cc:') ? c : `cc:${c}`).join(' ');

    if (isProblemFile && prefixedClasses !== trimmedClassString) {
        console.log(`[DEBUG] prefixClassesInString (${context}): Original '${classString}', Trimmed '${trimmedClassString}', Prefixed '${prefixedClasses}'`);
    }

    if (prefixedClasses !== trimmedClassString) {
        if (classString !== trimmedClassString) { // Had surrounding whitespace
            const leadSpace = classString.match(/^\s*/)[0];
            const trailSpace = classString.match(/\s*$/)[0];
            return `${leadSpace}${prefixedClasses}${trailSpace}`;
        }
        return prefixedClasses;
    }
    return classString; // No change needed
}

// Triggered by a regex like /\bvariants\s*:\s*\{/
function extractObjectContent(sourceString, objectKeyRegex, isProblemFile, debugContext) {
    const match = objectKeyRegex.exec(sourceString);
    if (!match) return null;

    const keyAndBrace = match[0]; // e.g., "variants: {"
    const startIndex = match.index + keyAndBrace.length; // Start of content inside braces

    let balance = 1;
    let endIndex = -1; // Will be the index of the closing brace
    for (let i = startIndex; i < sourceString.length; i++) {
        if (sourceString[i] === '{') balance++;
        else if (sourceString[i] === '}') balance--;
        if (balance === 0) {
            endIndex = i;
            break;
        }
    }

    if (endIndex === -1) {
        if (isProblemFile) console.log(`[DEBUG] ${debugContext}: Could not find matching closing brace for object starting at index ${match.index}.`);
        return null;
    }
    
    const content = sourceString.substring(startIndex, endIndex);
    return {
        content: content,
        startIndex: startIndex, // Content start index (after opening brace)
        endIndex: endIndex,     // Content end index (index of closing brace)
        fullMatchStartIndex: match.index, // Index where "key: {" started
        fullMatchEndIndex: endIndex + 1   // Index after the closing brace
    };
}

function processObjectStringForClassValues(objectContentString, isProblemFile, debugContext, stringLiteralRegex) {
    // objectContentString is the content *inside* the {}
    return objectContentString.replace(stringLiteralRegex, (literalMatch, quote, literalContent, offset) => {
        // Check if this literal is a key: e.g., "key": value
        const charAfterLiteralPos = offset + literalMatch.length;
        let isKey = false;
        if (charAfterLiteralPos < objectContentString.length) {
            let k = charAfterLiteralPos;
            while (k < objectContentString.length && /\s/.test(objectContentString[k])) k++; // skip whitespace
            if (k < objectContentString.length && objectContentString[k] === ':') {
                isKey = true;
            }
        }

        if (isKey) {
            if (isProblemFile) console.log(`[DEBUG] ${debugContext}: Skipping key literal: ${literalMatch}`);
            return literalMatch; // It's a key, don't touch
        }

        // If not a key, assume it's a class string value or an element in an array of class strings.
        const prefixedLiteralContent = prefixClassesInString(literalContent, isProblemFile, debugContext + "_val");
        if (prefixedLiteralContent !== literalContent) {
            if (isProblemFile) console.log(`[DEBUG] ${debugContext}: Prefixed value: "${literalContent}" -> "${prefixedLiteralContent}"`);
            return `${quote}${prefixedLiteralContent}${quote}`;
        }
        return literalMatch;
    });
}

async function getSvelteFilesRecursive(dirRelativePath) {
    const absoluteDir = path.resolve(PROJECT_ROOT, dirRelativePath);
    let svelteFiles = [];
    try {
        const items = await fs.readdir(absoluteDir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(absoluteDir, item.name);
            const pathRelativeToProjectRoot = path.relative(PROJECT_ROOT, fullPath);

            if (item.isDirectory()) {
                svelteFiles = svelteFiles.concat(await getSvelteFilesRecursive(pathRelativeToProjectRoot));
            } else if (item.isFile() && item.name.endsWith('.svelte')) {
                svelteFiles.push(pathRelativeToProjectRoot);
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT' && path.resolve(PROJECT_ROOT, dirRelativePath) === absoluteDir) {
            console.log(`Directory ${dirRelativePath} not found. No .svelte files to process from this path.`);
            return [];
        }
        console.error(`Error reading directory ${absoluteDir}: ${error.message}`);
        throw error;
    }
    return svelteFiles;
}

async function prefixClassesInFile(filePathRelativeToProjectRoot) {
    const absoluteFilePath = path.resolve(PROJECT_ROOT, filePathRelativeToProjectRoot);
    const isProblemFile = filePathRelativeToProjectRoot.includes('table-cell.svelte'); // Log specifically for this file

    if (isProblemFile) {
        console.log(`\n[DEBUG] >>> Processing file: ${filePathRelativeToProjectRoot}`);
    }

    try {
        let content = await fs.readFile(absoluteFilePath, 'utf-8');
        const originalContent = content;

        if (isProblemFile) {
            console.log('[DEBUG] Original content snippet (first 250 chars):\n', originalContent.substring(0, 250));
        }

        const mainRe = /\bclass\s*=\s*(["'])([^"'{}]*?)\1|\bclass\s*=\s*\{([^}]*?)\}/g;
        const cnRe = /\bcn\s*\(([\s\S]*?)\)/g;
        const stringLiteralRe = /([\"'])((?:\\.|(?!\1)[\s\S])*?)\1/g; // Used for cn and tv

        let newContent = content.replace(mainRe, (match, staticQuote, staticClasses, dynamicContent) => {
            if (isProblemFile) {
                console.log('[DEBUG] mainRe matched:', JSON.stringify(match.substring(0,100) + '...'));
            }
            if (staticClasses !== undefined) {
                const trimmedClassString = staticClasses.trim();
                if (trimmedClassString === '') return match;
                const classes = trimmedClassString.split(/\s+/).filter(c => c.length > 0);
                if (classes.length === 0) return match;
                const prefixedClasses = classes.map(c => c.startsWith('cc:') ? c : `cc:${c}`).join(' ');
                if (prefixedClasses !== trimmedClassString) {
                    if (staticClasses !== trimmedClassString) {
                        const leadSpace = staticClasses.match(/^\s*/)[0];
                        const trailSpace = staticClasses.match(/\s*$/)[0];
                        return `class=${staticQuote}${leadSpace}${prefixedClasses}${trailSpace}${staticQuote}`;
                    }
                    return `class=${staticQuote}${prefixedClasses}${staticQuote}`;
                }
                return match;
            } else if (dynamicContent !== undefined) {
                if (isProblemFile) {
                    console.log('[DEBUG] dynamicContent from mainRe:', JSON.stringify(dynamicContent));
                }
                let modifiedDynamicContent = dynamicContent;
                
                modifiedDynamicContent = dynamicContent.replace(cnRe, (cnCallMatch, cnArgsString) => {
                    if (isProblemFile) {
                        console.log('[DEBUG] cnRe matched:', JSON.stringify(cnCallMatch.substring(0,100)+'...'));
                        console.log('[DEBUG] cnArgsString from cnRe:', JSON.stringify(cnArgsString));
                    }
                    const newArgs = [];
                    let lastIndex = 0;
                    let strMatch;
                    stringLiteralRe.lastIndex = 0;

                    while ((strMatch = stringLiteralRe.exec(cnArgsString)) !== null) {
                        newArgs.push(cnArgsString.substring(lastIndex, strMatch.index));
                        const quote = strMatch[1];
                        let literalContent = strMatch[2];
                        if (isProblemFile) {
                            console.log(`[DEBUG] stringLiteralRe found: ${JSON.stringify(strMatch[0])}, literalContent: ${JSON.stringify(literalContent)}`);
                        }
                        const trimmedLiteralContent = literalContent.trim();
                        if (trimmedLiteralContent !== '') {
                            const subClasses = trimmedLiteralContent.split(/\s+/).filter(c => c.length > 0);
                            const prefixedSubClasses = subClasses.map(c => c.startsWith('cc:') ? c : `cc:${c}`).join(' ');
                            if (isProblemFile) {
                                console.log(`[DEBUG]   Trimmed: ${JSON.stringify(trimmedLiteralContent)}, Prefixed: ${JSON.stringify(prefixedSubClasses)}`);
                            }
                            if (prefixedSubClasses !== trimmedLiteralContent) {
                                if (literalContent !== trimmedLiteralContent) {
                                    const leadSpaceLit = literalContent.match(/^\s*/)[0];
                                    const trailSpaceLit = literalContent.match(/\s*$/)[0];
                                    literalContent = `${leadSpaceLit}${prefixedSubClasses}${trailSpaceLit}`;
                                } else {
                                    literalContent = prefixedSubClasses;
                                }
                                if (isProblemFile) console.log(`[DEBUG]   literalContent updated to: ${JSON.stringify(literalContent)}`);
                            }
                        }
                        newArgs.push(`${quote}${literalContent}${quote}`);
                        lastIndex = stringLiteralRe.lastIndex;
                    }
                    newArgs.push(cnArgsString.substring(lastIndex));
                    
                    const newCnArgsString = newArgs.join('');
                    if (isProblemFile) {
                        console.log('[DEBUG] newCnArgsString constructed:', JSON.stringify(newCnArgsString));
                        if (newCnArgsString === cnArgsString) console.log('[DEBUG]   newCnArgsString IS THE SAME as cnArgsString');
                        else console.log('[DEBUG]   newCnArgsString IS DIFFERENT from cnArgsString');
                    }
                    if (newCnArgsString !== cnArgsString) {
                        return `cn(${newCnArgsString})`;
                    }
                    return cnCallMatch;
                });

                if (isProblemFile) {
                    console.log('[DEBUG] modifiedDynamicContent (after cnRe.replace):', JSON.stringify(modifiedDynamicContent));
                    if (modifiedDynamicContent === dynamicContent) console.log('[DEBUG]   modifiedDynamicContent IS THE SAME as dynamicContent');
                    else console.log('[DEBUG]   modifiedDynamicContent IS DIFFERENT from dynamicContent');
                }
                if (modifiedDynamicContent !== dynamicContent) {
                    return `class={${modifiedDynamicContent}}`;
                }
                return match;
            }
            return match;
        });

        // Process tv() calls after class attributes and cn() calls
        const tvCallRegex = /\btv\s*\(([\s\S]*?)\)/g; 
        
        let finalContent = "";
        let lastIndexProcessed = 0;
        let tvMatch;
        
        // Manually iterate over tvCallRegex matches because we are modifying the string
        // and regex lastIndex might get confused with global replace.
        const tvMatches = [];
        while((tvMatch = tvCallRegex.exec(newContent)) !== null) {
            tvMatches.push({
                match: tvMatch[0],
                argsString: tvMatch[1],
                index: tvMatch.index,
                length: tvMatch[0].length
            });
        }

        for (const currentTv of tvMatches) {
            finalContent += newContent.substring(lastIndexProcessed, currentTv.index);
            let tvArgsString = currentTv.argsString;
            let modifiedTvArgsString = tvArgsString;

            if (isProblemFile) {
                console.log(`\n[DEBUG] tvCallRegex processing TV call at index ${currentTv.index}:`, JSON.stringify(currentTv.match.substring(0,150)+'...'));
                console.log('[DEBUG] tvArgsString initial:', JSON.stringify(tvArgsString.substring(0,100)+'...'));
            }

            // 1. Process `base: "..."`
            modifiedTvArgsString = modifiedTvArgsString.replace(
                /(\bbase\s*:\s*)(["'])((?:\\.|(?!\2)[\s\S])*?)\2/g,
                (baseMatch, keyPart, quote, classStr) => {
                    const prefixedClassStr = prefixClassesInString(classStr, isProblemFile, "tv_base");
                    if (prefixedClassStr !== classStr) {
                        return `${keyPart}${quote}${prefixedClassStr}${quote}`;
                    }
                    return baseMatch;
                }
            );

            // 2. Process `class: "..."` (for compoundVariants, etc.)
            modifiedTvArgsString = modifiedTvArgsString.replace(
                /(\bclass\s*:\s*)(["'])((?:\\.|(?!\2)[\s\S])*?)\2/g,
                (classMatch, keyPart, quote, classStr) => {
                    const prefixedClassStr = prefixClassesInString(classStr, isProblemFile, "tv_compound_class");
                    if (prefixedClassStr !== classStr) {
                        return `${keyPart}${quote}${prefixedClassStr}${quote}`;
                    }
                    return classMatch;
                }
            );
            
            // 3. Process `variants: { ... }`
            // Need to re-run extract on potentially modified string if base/class were part of args
            let tempTvArgsForVariants = modifiedTvArgsString;
            const variantsObjectInfo = extractObjectContent(tempTvArgsForVariants, /\bvariants\s*:\s*\{/, isProblemFile, "tv_variants_extract");
            if (variantsObjectInfo) {
                const { content: variantsContent, startIndex: vContentStart, endIndex: vContentEnd } = variantsObjectInfo;
                if (isProblemFile) console.log(`[DEBUG] tv/variants: Extracted object content: ${JSON.stringify(variantsContent.substring(0,100)+'...')} `);
                
                const processedVariantsContent = processObjectStringForClassValues(variantsContent, isProblemFile, "tv_variants", stringLiteralRe);
                
                if (processedVariantsContent !== variantsContent) {
                    modifiedTvArgsString = tempTvArgsForVariants.substring(0, vContentStart) +
                                           processedVariantsContent +
                                           tempTvArgsForVariants.substring(vContentEnd);
                    if (isProblemFile) console.log(`[DEBUG] tv/variants: Variants object content was modified.`);
                }
            }
            
            // 4. Process `slots: { ... }`
            let tempTvArgsForSlots = modifiedTvArgsString; // Use the string updated by variants processing
            const slotsObjectInfo = extractObjectContent(tempTvArgsForSlots, /\bslots\s*:\s*\{/, isProblemFile, "tv_slots_extract");
            if (slotsObjectInfo) {
                const { content: slotsContent, startIndex: sContentStart, endIndex: sContentEnd } = slotsObjectInfo;
                 if (isProblemFile) console.log(`[DEBUG] tv/slots: Extracted object content: ${JSON.stringify(slotsContent.substring(0,100)+'...')} `);

                const processedSlotsContent = processObjectStringForClassValues(slotsContent, isProblemFile, "tv_slots", stringLiteralRe);

                if (processedSlotsContent !== slotsContent) {
                    modifiedTvArgsString = tempTvArgsForSlots.substring(0, sContentStart) +
                                           processedSlotsContent +
                                           tempTvArgsForSlots.substring(sContentEnd);
                     if (isProblemFile) console.log(`[DEBUG] tv/slots: Slots object content was modified.`);
                }
            }

            if (modifiedTvArgsString !== tvArgsString) {
                if (isProblemFile) console.log('[DEBUG] tvCallRegex: tvArgsString was modified. Final:', JSON.stringify(modifiedTvArgsString.substring(0,100)+'...'));
                finalContent += `tv(${modifiedTvArgsString})`;
            } else {
                if (isProblemFile) console.log('[DEBUG] tvCallRegex: tvArgsString was NOT modified.');
                finalContent += currentTv.match;
            }
            lastIndexProcessed = currentTv.index + currentTv.length;
        }
        finalContent += newContent.substring(lastIndexProcessed); // Append the rest of the file

        newContent = finalContent; // Update newContent with tv modifications

        if (isProblemFile) {
            console.log('[DEBUG] newContent snippet (first 250 chars):\n', newContent.substring(0, 250));
            if (originalContent === newContent) {
                console.log('[DEBUG] Final check: originalContent IS THE SAME as newContent. No changes will be written.');
            } else {
                console.log('[DEBUG] Final check: originalContent IS DIFFERENT from newContent. Changes should be written.');
            }
        }

        if (newContent !== originalContent) {
            await fs.writeFile(absoluteFilePath, newContent, 'utf-8');
            const displayPath = filePathRelativeToProjectRoot.replace(/\\/g, '/');
            console.log(`Prefixed classes in ${displayPath}`);
        } else {
            // console.log(`No changes made to ${filePathRelativeToProjectRoot}`);
        }
    } catch (error) {
        const displayPath = filePathRelativeToProjectRoot.replace(/\\/g, '/');
        console.error(`Error processing file ${absoluteFilePath} (logical path: ${displayPath}): ${error.message}`);
        console.error(error.stack);
    }
    if (isProblemFile) {
        console.log(`[DEBUG] <<< Finished processing file: ${filePathRelativeToProjectRoot}\n`);
    }
}

async function main() {
    console.log('Starting script to prefix CSS classes in .svelte files...');
    console.log(`Searching in ./${TARGET_DIR_RELATIVE}`);

    const svelteFiles = await getSvelteFilesRecursive(TARGET_DIR_RELATIVE);

    if (svelteFiles.length === 0) {
        console.log(`No .svelte files found in ./${TARGET_DIR_RELATIVE} or its subdirectories.`);
        return;
    }

    console.log(`Found ${svelteFiles.length} .svelte file(s). Processing...`);
    for (const filePath of svelteFiles) {
        await prefixClassesInFile(filePath);
    }
    console.log('Finished prefixing classes.');
    console.log('Please review the changes made to your files.');
}

main().catch(err => {
    console.error("Script execution failed:", err);
    process.exit(1);
});
