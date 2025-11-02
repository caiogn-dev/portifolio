#!/usr/bin/env python3

import re

# Read the file
with open('components/Contact/EnhancedContactSystem.tsx', 'r') as f:
    content = f.read()

# Replace all SelectRoot patterns with simple HTML select
# Project type select
project_type_select = '''<select
                    name="projectType"
                    value={values.projectType}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">{language === 'en' ? 'Select type' : 'Selecione o tipo'}</option>
                    <option value="web-app">
                      {language === 'en' ? 'Web Application' : 'Aplicação Web'}
                    </option>
                    <option value="mobile-app">
                      {language === 'en' ? 'Mobile App' : 'App Mobile'}
                    </option>
                    <option value="ecommerce">
                      {language === 'en' ? 'E-commerce' : 'E-commerce'}
                    </option>
                    <option value="landing">
                      {language === 'en' ? 'Landing Page' : 'Landing Page'}
                    </option>
                    <option value="other">
                      {language === 'en' ? 'Other' : 'Outro'}
                    </option>
                  </select>'''

# Replace project type select
pattern1 = r'<SelectRoot[^>]*>.*?</SelectRoot>'
content = re.sub(pattern1, project_type_select, content, flags=re.DOTALL, count=1)

# Budget select
budget_select = '''<select
                    name="budget"
                    value={values.budget}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">{language === 'en' ? 'Select budget' : 'Selecione orçamento'}</option>
                    <option value="under-5k">
                      {language === 'en' ? 'Under $5,000' : 'Abaixo de R$ 25.000'}
                    </option>
                    <option value="5k-15k">
                      {language === 'en' ? '$5,000 - $15,000' : 'R$ 25.000 - R$ 75.000'}
                    </option>
                    <option value="15k-50k">
                      {language === 'en' ? '$15,000 - $50,000' : 'R$ 75.000 - R$ 250.000'}
                    </option>
                    <option value="over-50k">
                      {language === 'en' ? 'Over $50,000' : 'Acima de R$ 250.000'}
                    </option>
                  </select>'''

# Replace budget select
content = re.sub(pattern1, budget_select, content, flags=re.DOTALL, count=1)

# Timeline select
timeline_select = '''<select
                    name="timeline"
                    value={values.timeline}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">{language === 'en' ? 'Select timeline' : 'Selecione prazo'}</option>
                    <option value="asap">
                      {language === 'en' ? 'ASAP' : 'O mais rápido possível'}
                    </option>
                    <option value="1-month">
                      {language === 'en' ? '1 Month' : '1 Mês'}
                    </option>
                    <option value="2-3-months">
                      {language === 'en' ? '2-3 Months' : '2-3 Meses'}
                    </option>
                    <option value="3-plus-months">
                      {language === 'en' ? '3+ Months' : '3+ Meses'}
                    </option>
                  </select>'''

# Replace timeline select
content = re.sub(pattern1, timeline_select, content, flags=re.DOTALL, count=1)

# Write back
with open('components/Contact/EnhancedContactSystem.tsx', 'w') as f:
    f.write(content)

print("Replaced SelectRoot components with simple HTML select elements")