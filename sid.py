import random

# Sample data for names, locations, and types
names = ["Luxury Homes", "Dream Residency", "Skyline Towers", "Golden Retreat", "Green Valley Apartments",
         "Royal Mansions", "Lakeview Estates", "Palm Grove Villas", "Sunrise Heights", "Sapphire Residences",
         "Serenity Springs", "Tranquil Towers", "Majestic Gardens", "Elegant Enclave", "Harmony Heights"]
locations = ["Andheri, Mumbai", "Dadar, Mumbai", "Bandra, Mumbai", "Ghatkopar, Mumbai", "Parel, Mumbai"]
types = ["Studio Apartments", "Bungalows", "Villas", "Apartments"]

# Function to generate a random dataset
def generate_dataset():
    location = random.choice(locations)
    area = random.randint(500, 2000)
    type_ = random.choice(types)
    name = f"{random.choice(names)} {type_} in {location} with an area of {area} sqft"
    return {
        "name": name,
        "type": type_,
        "location": location,
        "area": area  # Random area between 500 and 2000 sqft
    }

# Generate a single dataset
dataset = generate_dataset()
# Ensure consistency between the type mentioned in the name and the actual type

# if name_parts[-2] in ['Villas', 'Terraces']:
#     dataset['type'] = 'Villas'

# Print the dataset
print(dataset)