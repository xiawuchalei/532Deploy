import pandas as pd

df1 = pd.read_csv('access-to-clean-fuels-for-cooking-vs-gdp-per-capita.csv')
df2 = pd.read_csv('access-to-electricity-vs-gdp-per-capita.csv')
hale = pd.read_csv('hale.csv')

# Rename columns in df1
df1 = df1.rename(columns={'Entity': 'Country',
                          'GDP per capita, PPP (constant 2017 international $)': 'GDP',
                          'Indicator:Proportion of population with primary reliance on clean fuels and technologies for cooking (%) - Residence Area Type:Total': 'IndicatorCleanFuel'})

# Rename columns in df2
df2 = df2.rename(columns={'Entity': 'Country',
                          'Access to electricity (% of population)': 'AccessToElectricity'})

# Remove 'Continent' column from df2
df2 = df2.drop('Continent', axis=1)

# Merge df1 and df2 based on the columns 'Country', 'Code', and 'Year' using outer join
merged_data = pd.merge(df1, df2, how='right', on=['Country', 'Code', 'Year'])

# Assign 'Continent' values to each country
merged_data['Continent'] = merged_data.groupby('Country')['Continent'].transform('first')

# Filter the merged data to include only rows between the years 2000 and 2020
merged_data = merged_data[(merged_data['Year'] >= 2000) & (merged_data['Year'] <= 2020)]

# Merge the hale DataFrame with the merged_data DataFrame based on the 'Country' column using outer join
final_data = pd.merge(merged_data, hale[['country', 'hale']], how='left', left_on=['Country'], right_on=['country'])

# Remove non-numeric values from 'hale' column
final_data['hale'] = pd.to_numeric(final_data['hale'], errors='coerce')

# Rearrange the columns in the final DataFrame
final_data = final_data[['Country', 'Code', 'Year', 'IndicatorCleanFuel', 'GDP', 'Population (historical estimates)', 'AccessToElectricity', 'Continent', 'hale']]

# Rename the 'hale' column to 'AverageLifeSpan'
final_data = final_data.rename(columns={'hale': 'AverageLifeSpan'})

# Write the final DataFrame to a new CSV file named 'combined.csv'
final_data.to_csv('combined.csv', index=False)
