import csv
import json


def find_location(course_code, slot):
  with open('C:/Users/piyush/Desktop/room.csv', mode='r', encoding='mac_roman') as file:
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
      if row["Course Number"] != "" and row["Courses Slot"] != "":

        location = find_location(
          row["Course Number"].replace('-', ''), row["Courses Slot"])
        course = {
            "code": row["Course Number"],
            "name": row["Course Name"].strip('"'),
            "professor": row["Faculty Name"].strip('"'),
            "slot": row["Courses Slot"],
            "location": location if not row['Course Number'].endswith('P') else None,
        }
        courses.append(course)

        if row["Lab Courses Slot"].strip():
          lab_course = {
              "code": f"{row['Course Number']}P",
              "name": row["Course Name"].strip('"'),
              "professor": row["Faculty Name"].strip('"'),
              "slot": row["Lab Courses Slot"].strip(),
              "location": location if not row['Course Number'].endswith('P') else None,
          }
          courses.append(lab_course)
    # in courses delete all courses with code ending with PP
    courses = [
      course for course in courses if not course['code'].endswith('PP')]
    with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
      json.dump(courses, jsonfile, indent=2)


# Example usage:
csv_file_path = 'cl.csv'  # Path to your input CSV file
json_file_path = 'courses.json'  # Path where the output JSON file will be saved
convert_csv_to_json(csv_file_path, json_file_path)
