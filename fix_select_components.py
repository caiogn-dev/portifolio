#!/usr/bin/env python3

import re

# Read the file
with open('components/Contact/EnhancedContactSystem.tsx', 'r') as f:
    content = f.read()

# Define the project type select replacement
project_type_select = '''<SelectRoot
                    value={[values.projectType]}
                    onValueChange={(details) => {
                      const event = {
                        target: { name: 'projectType', value: details.value[0] || '' }
                      };
                      handleChange(event);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder={language === 'en' ? 'Select type' : 'Selecione o tipo'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem item={{ label: language === 'en' ? 'Web Application' : 'Aplicação Web', value: 'web-app' }}>
                        {language === 'en' ? 'Web Application' : 'Aplicação Web'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? 'Mobile App' : 'App Mobile', value: 'mobile-app' }}>
                        {language === 'en' ? 'Mobile App' : 'App Mobile'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? 'E-commerce' : 'E-commerce', value: 'ecommerce' }}>
                        {language === 'en' ? 'E-commerce' : 'E-commerce'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? 'Landing Page' : 'Landing Page', value: 'landing' }}>
                        {language === 'en' ? 'Landing Page' : 'Landing Page'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? 'Other' : 'Outro', value: 'other' }}>
                        {language === 'en' ? 'Other' : 'Outro'}
                      </SelectItem>
                    </SelectContent>
                  </SelectRoot>'''

# Replace project type select
pattern1 = r'<Select\s+name="projectType"[^>]*>.*?</Select>'
content = re.sub(pattern1, project_type_select, content, flags=re.DOTALL)

# Define the budget select replacement
budget_select = '''<SelectRoot
                    value={[values.budget]}
                    onValueChange={(details) => {
                      const event = {
                        target: { name: 'budget', value: details.value[0] || '' }
                      };
                      handleChange(event);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder={language === 'en' ? 'Select budget' : 'Selecione orçamento'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem item={{ label: language === 'en' ? 'Under $5,000' : 'Abaixo de R$ 25.000', value: 'under-5k' }}>
                        {language === 'en' ? 'Under $5,000' : 'Abaixo de R$ 25.000'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? '$5,000 - $15,000' : 'R$ 25.000 - R$ 75.000', value: '5k-15k' }}>
                        {language === 'en' ? '$5,000 - $15,000' : 'R$ 25.000 - R$ 75.000'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? '$15,000 - $50,000' : 'R$ 75.000 - R$ 250.000', value: '15k-50k' }}>
                        {language === 'en' ? '$15,000 - $50,000' : 'R$ 75.000 - R$ 250.000'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? 'Over $50,000' : 'Acima de R$ 250.000', value: 'over-50k' }}>
                        {language === 'en' ? 'Over $50,000' : 'Acima de R$ 250.000'}
                      </SelectItem>
                    </SelectContent>
                  </SelectRoot>'''

# Replace budget select
pattern2 = r'<Select\s+name="budget"[^>]*>.*?</Select>'
content = re.sub(pattern2, budget_select, content, flags=re.DOTALL)

# Define the timeline select replacement
timeline_select = '''<SelectRoot
                    value={[values.timeline]}
                    onValueChange={(details) => {
                      const event = {
                        target: { name: 'timeline', value: details.value[0] || '' }
                      };
                      handleChange(event);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder={language === 'en' ? 'Select timeline' : 'Selecione prazo'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem item={{ label: language === 'en' ? 'ASAP' : 'O mais rápido possível', value: 'asap' }}>
                        {language === 'en' ? 'ASAP' : 'O mais rápido possível'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? '1 Month' : '1 Mês', value: '1-month' }}>
                        {language === 'en' ? '1 Month' : '1 Mês'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? '2-3 Months' : '2-3 Meses', value: '2-3-months' }}>
                        {language === 'en' ? '2-3 Months' : '2-3 Meses'}
                      </SelectItem>
                      <SelectItem item={{ label: language === 'en' ? '3+ Months' : '3+ Meses', value: '3-plus-months' }}>
                        {language === 'en' ? '3+ Months' : '3+ Meses'}
                      </SelectItem>
                    </SelectContent>
                  </SelectRoot>'''

# Replace timeline select
pattern3 = r'<Select\s+name="timeline"[^>]*>.*?</Select>'
content = re.sub(pattern3, timeline_select, content, flags=re.DOTALL)

# Write back
with open('components/Contact/EnhancedContactSystem.tsx', 'w') as f:
    f.write(content)

print("Replaced Select components with v3 compatible SelectRoot components")