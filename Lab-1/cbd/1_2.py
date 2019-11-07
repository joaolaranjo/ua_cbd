input = open("female_names.txt", "r") 
output = open("set_initial_number.txt", "w")
dict = {}

for linha in input:
	print(linha[0].upper())
	key = linha[0].upper()

	if key in dict.keys():
		dict[key] = dict.get(key) + 1
	else:
		dict[key] = 1

for key in dict.keys():
	output.write("SET " + key + " "  + str(dict.get(key)) + "\n")
		
input.close()
output.close()
