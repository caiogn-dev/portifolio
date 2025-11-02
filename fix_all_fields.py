#!/usr/bin/env python3

import re

# Read the file
with open('components/Contact/EnhancedContactSystem.tsx', 'r') as f:
    content = f.read()

# Define field mappings
field_mappings = [
    # Email field
    {
        'pattern': r'<Field invalid=\{\!\!\(errors\.email && touched\.email\)\} required>\s*<FormLabel>\s*\{language === \'en\' \? \'Email Address\' : \'Endereço de Email\'\}\s*</FormLabel>\s*(<Input[^>]*name="email"[^>]*/>)\s*<FormErrorMessage>\{errors\.email\}</FormErrorMessage>\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Email Address\' : \'Endereço de Email\'} invalid={!!(errors.email && touched.email)} required errorText={errors.email}>\1</Field>'
    },
    # Phone field
    {
        'pattern': r'<Field invalid=\{\!\!\(errors\.phone && touched\.phone\)\}>\s*<FormLabel>\s*\{language === \'en\' \? \'Phone Number\' : \'Número de Telefone\'\}\s*</FormLabel>\s*(<Input[^>]*name="phone"[^>]*/>)\s*<FormErrorMessage>\{errors\.phone\}</FormErrorMessage>\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Phone Number\' : \'Número de Telefone\'} invalid={!!(errors.phone && touched.phone)} errorText={errors.phone}>\1</Field>'
    },
    # Company field
    {
        'pattern': r'<Field>\s*<FormLabel>\s*\{language === \'en\' \? \'Company\' : \'Empresa\'\}\s*</FormLabel>\s*(<Input[^>]*name="company"[^>]*/>)\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Company\' : \'Empresa\'}>\1</Field>'
    },
    # Project Type field
    {
        'pattern': r'<Field>\s*<FormLabel>\s*\{language === \'en\' \? \'Project Type\' : \'Tipo de Projeto\'\}\s*</FormLabel>\s*(<Select[^>]*name="projectType"[^>]*>.*?</Select>)\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Project Type\' : \'Tipo de Projeto\'}>\1</Field>',
        'flags': re.DOTALL
    },
    # Budget field
    {
        'pattern': r'<Field>\s*<FormLabel>\s*\{language === \'en\' \? \'Budget Range\' : \'Faixa de Orçamento\'\}\s*</FormLabel>\s*(<Select[^>]*name="budget"[^>]*>.*?</Select>)\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Budget Range\' : \'Faixa de Orçamento\'}>\1</Field>',
        'flags': re.DOTALL
    },
    # Timeline field
    {
        'pattern': r'<Field>\s*<FormLabel>\s*\{language === \'en\' \? \'Timeline\' : \'Cronograma\'\}\s*</FormLabel>\s*(<Select[^>]*name="timeline"[^>]*>.*?</Select>)\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Timeline\' : \'Cronograma\'}>\1</Field>',
        'flags': re.DOTALL
    },
    # Subject field
    {
        'pattern': r'<Field invalid=\{\!\!\(errors\.subject && touched\.subject\)\} required>\s*<FormLabel>\s*\{language === \'en\' \? \'Subject\' : \'Assunto\'\}\s*</FormLabel>\s*(<Input[^>]*name="subject"[^>]*/>)\s*<FormErrorMessage>\{errors\.subject\}</FormErrorMessage>\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Subject\' : \'Assunto\'} invalid={!!(errors.subject && touched.subject)} required errorText={errors.subject}>\1</Field>'
    },
    # Message field
    {
        'pattern': r'<Field invalid=\{\!\!\(errors\.message && touched\.message\)\} required>\s*<FormLabel>\s*\{language === \'en\' \? \'Message\' : \'Mensagem\'\}\s*</FormLabel>\s*(<Textarea[^>]*name="message"[^>]*/>)\s*<FormErrorMessage>\{errors\.message\}</FormErrorMessage>\s*</Field>',
        'replacement': r'<Field label={language === \'en\' ? \'Message\' : \'Mensagem\'} invalid={!!(errors.message && touched.message)} required errorText={errors.message}>\1</Field>'
    }
]

# Apply all replacements
for mapping in field_mappings:
    flags = mapping.get('flags', 0)
    content = re.sub(mapping['pattern'], mapping['replacement'], content, flags=flags)

# Write back
with open('components/Contact/EnhancedContactSystem.tsx', 'w') as f:
    f.write(content)

print("All field patterns have been updated")