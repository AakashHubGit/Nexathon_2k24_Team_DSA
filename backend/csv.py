import csv



csv_file_path = "projects.csv"

# Define the field names for the CSV file
field_names = ['name', 'type', 'location', 'area']

# Write the data to the CSV file
with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(field_names)  # Write the header
    for project in projects:
        writer.writerow([project[field] for field in field_names])

print("CSV file created successfully.")