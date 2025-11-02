#!/usr/bin/env python3

import re

# Read the file
with open('components/Contact/EnhancedContactSystem.tsx', 'r') as f:
    content = f.read()

# Replace FormControl with Box
content = re.sub(r'<FormControl[^>]*>', '<Box>', content)
content = re.sub(r'</FormControl>', '</Box>', content)

# Replace FormLabel with Text
content = re.sub(r'<FormLabel>\s*([^<]+)\s*</FormLabel>', r'<Text fontSize="sm" fontWeight="medium" mb={2}>\1</Text>', content)

# Replace FormErrorMessage with conditional Text
content = re.sub(r'<FormErrorMessage>\{errors\.(\w+)\}</FormErrorMessage>', r'{errors.\1 && touched.\1 && (<Text color="red.500" fontSize="sm" mt={1}>{errors.\1}</Text>)}', content)

# Write back
with open('components/Contact/EnhancedContactSystem.tsx', 'w') as f:
    f.write(content)

print("Replaced FormControl components with basic components")