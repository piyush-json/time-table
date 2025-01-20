import csv
import json


def find_location(course_code, slot):
  with open('./room.csv', mode='r', encoding='mac_roman') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
      if row[0] == course_code and row[1] == slot:
        return row[2]
  return None


def convert_csv_to_json(csv_file_path, json_file_path):
  with open(csv_file_path, newline='', encoding='mac_roman') as csvfile:
    reader = csv.DictReader(csvfile)
    courses = []
    for row in reader:
      slot = row["Courses Slot"]
      lslot = row["Lab Courses Slot"]
      code = row["Course Number"]
      if code != "":
        if slot != "" and not code.endswith('P'):
          location = find_location(
            code.replace('-', ''), slot)
          if slot.strip():
            course = {
                "code": code,
                "name": row["Course Name"].strip('"'),
                "professor": row["Faculty Name"].strip('"'),
                "slot": slot.strip(),
                "location": location if not row['Course Number'].endswith('P') else None,
            }
            courses.append(course)
        if lslot.strip() or code.endswith('P'):
          lab_course = {
              "code": f"{code}P" if not code.endswith('P') else code,
              "name": row["Course Name"].strip('"'),
              "professor": row["Faculty Name"].strip('"'),
              "slot": lslot.strip() if lslot.strip() else slot.strip(),
              "location": None,
          }
          courses.append(lab_course)
    courses = [
      course for course in courses if not course['code'].endswith('PP')]
    with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
      json.dump(courses, jsonfile, indent=2)


# Example usage:
csv_file_path = 'cl.csv'  # Path to your input CSV file
json_file_path = 'courses.json'  # Path where the output JSON file will be saved
convert_csv_to_json(csv_file_path, json_file_path)
