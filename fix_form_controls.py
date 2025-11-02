#!/usr/bin/env python3

import re

# Read the file
with open('components/Contact/EnhancedContactSystem.tsx', 'r') as f:
    content = f.read()

# Pattern to match FormControl with isInvalid and isRequired
pattern1 = r'<FormControl isInvalid=\{\!\!\(errors\.(\w+) && touched\.(\w+)\)\} isRequired>'
replacement1 = r'<Field invalid={!!(errors.\1 && touched.\1)} required>'

# Pattern to match FormControl with only isInvalid
pattern2 = r'<FormControl isInvalid=\{\!\!\(errors\.(\w+) && touched\.(\w+)\)\}>'
replacement2 = r'<Field invalid={!!(errors.\1 && touched.\1)}>'

# Pattern to match simple FormControl
pattern3 = r'<FormControl>'
replacement3 = r'<Field>'

# Pattern to match closing FormControl
pattern4 = r'</FormControl>'
replacement4 = r'</Field>'

# Pattern to match FormLabel
pattern5 = r'<FormLabel>\s*([^<]+)\s*</FormLabel>'
replacement5 = r'label={\1}'

# Pattern to match FormErrorMessage
pattern6 = r'<FormErrorMessage>\{errors\.(\w+)\}</FormErrorMessage>'
replacement6 = r'errorText={errors.\1}'

# Apply replacements
content = re.sub(pattern1, replacement1, content)
content = re.sub(pattern2, replacement2, content)
content = re.sub(pattern3, replacement3, content)
content = re.sub(pattern4, replacement4, content)

# Write back
with open('components/Contact/EnhancedContactSystem.tsx', 'w') as f:
    f.write(content)

print("FormControl patterns replaced with Field patterns")