import csv
import json
import os
import re




def convert_csv_to_json(csv_file_path, json_file_path):
    courses = []
    
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            course_code = row['Course Code'].strip()
            course_name = row['Course Name'].strip()
            professor = row['Professor Name'].strip()
            slot = row['Slot'].strip()
            
            if '/' in course_code:
                codes = [code.strip() for code in course_code.split('/')]
                course_code = codes[-1]
            
            def is_valid_slot(slot_value):
                if not slot_value:
                    return False
                if len(slot_value) == 1 and slot_value in 'ABCDEFGH':
                    return True
                if slot_value == 'FS':
                    return True
                if re.match(r'^L\d+$', slot_value):
                    return True
                if slot_value == 'NS':
                    return True
                return False
            
            def normalize_slot_part(slot_part):
                slot_part = slot_part.strip()
                if not slot_part:
                    return None
                if len(slot_part) == 1 and slot_part in 'ABCDEFGH':
                    return slot_part
                if 'FS' in slot_part.upper():
                    return 'FS'
                ls_match = re.match(r'^LS(\d+)$', slot_part)
                if ls_match:
                    return f"L{ls_match.group(1)}"
                if re.match(r'^L\d+$', slot_part):
                    return slot_part
                if slot_part == 'NS':
                    return slot_part
                return "NS"
            
            if not slot:
                slot = "NS"
            
            has_lab = False
            lab_slot = None
            first_slot = None
            
            if '&LS' in slot:
                parts = slot.split('&LS', 1)
                first_part = parts[0].strip()
                if len(first_part) == 1 and first_part in 'ABCDEFGH':
                    first_slot = first_part
                    ls_part = 'LS' + parts[1] if len(parts) > 1 else ""
                    if ls_part:
                        lab_slot = normalize_slot_part(ls_part)
                        has_lab = True
            elif ',LS' in slot:
                parts = slot.split(',LS', 1)
                first_part = parts[0].strip()
                if len(first_part) == 1 and first_part in 'ABCDEFGH':
                    first_slot = first_part
                    ls_part = 'LS' + parts[1] if len(parts) > 1 else ""
                    if ls_part:
                        lab_slot = normalize_slot_part(ls_part)
                        has_lab = True
            
            if has_lab and first_slot and lab_slot:
                if not is_valid_slot(first_slot):
                    first_slot = "NS"
                if not is_valid_slot(lab_slot):
                    lab_slot = "NS"
                
                course = {
                    "code": course_code,
                    "name": course_name,
                    "professor": professor,
                    "slot": first_slot,
                    "location": ""
                }
                courses.append(course)
                
                lab_course = {
                    "code": course_code,
                    "name": f"{course_name} Lab",
                    "professor": professor,
                    "slot": lab_slot,
                    "location": ""
                }
                courses.append(lab_course)
            else:
                if ',' in slot:
                    parts = [p.strip() for p in slot.split(',')]
                elif '&' in slot:
                    parts = [p.strip() for p in slot.split('&')]
                else:
                    parts = [slot.strip()]
                
                normalized_parts = [normalize_slot_part(p) for p in parts if normalize_slot_part(p)]
                
                final_slot = normalized_parts[-1] if normalized_parts else "NS"
                
                if not is_valid_slot(final_slot):
                    final_slot = "NS"
                
                course = {
                    "code": course_code,
                    "name": course_name,
                    "professor": professor,
                    "slot": final_slot,
                    "location": ""
                }
                courses.append(course)
    
    with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(courses, jsonfile, indent=2, ensure_ascii=False)
    
    print(f"Converted {len(courses)} courses to {json_file_path}")
    return courses


if __name__ == '__main__':
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    csv_file_path = os.path.join(script_dir, 'jan26.csv')
    json_file_path = os.path.join(script_dir, 'courses.json')
    
    convert_csv_to_json(csv_file_path, json_file_path)

