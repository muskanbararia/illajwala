Lybrate.cities = {};
Lybrate.specializations = {};
Lybrate.symptoms = {};
Lybrate.treatmentsList = {};
Lybrate.specializationsAlpha = {};
Lybrate.specializationsAll = {};
Lybrate.topSpecializationsWithUrl = {};
Lybrate.popularCities = {};
Lybrate.StateList = {};

Lybrate.popularCities.get = function() {
	return [ "New Delhi", "Bangalore", "Mumbai", "Hyderabad", "Chennai", "Kolkata", "Pune", "Gurgaon"];
};

Lybrate.cities.get = function(){
	return [ '24 Parganas', 'Abohar', 'Adilabad', 'Agra', 'Ahmedabad',
				'Ahmednagar', 'Aizawl', 'Ajmer', 'Akola', 'Alappuzha',
				'Aligarh', 'Allahabad', 'Almora', 'Alwar', 'Amarnath',
				'Ambala', 'Ambedkar Nagar', 'Amravati', 'Amreli',
				'Amritsar', 'Anand', 'Anantapur', 'Anantnag',
				'Andaman & Nicobar', 'Angul', 'Anuppur', 'Araria',
				'Arwal', 'Asansol', 'Ashoknagar', 'Auraiya',
				'Aurangabad', 'Azamgarh', 'Badgam', 'Bagalkot',
				'Bageshwar', 'Baghpat', 'Bahadurgarh', 'Bahraich',
				'Baksa', 'Balaghat', 'Ballia', 'Balrampur',
				'Banaskantha', 'Banda', 'Banka', 'Bankura', 'Banswara',
				'Barabanki', 'Baramula', 'Baran', 'Bardhaman',
				'Bareilly', 'Bargarh', 'Barmer', 'Barnala', 'Barpeta',
				'Barwani', 'Bastar', 'Basti', 'Bathinda', 'Beawar',
				'Beed', 'Begusarai', 'Belgaum', 'Bellary', 'Betul',
				'Bhadrak', 'Bhagalpur', 'Bhandara', 'Bharatpur',
				'Bharuch', 'Bhavnagar', 'Bhilai', 'Bhilwara', 'Bhind',
				'Bhiwadi', 'Bhiwandi', 'Bhiwani', 'Bhojpur', 'Bhopal',
				'Bhramapur', 'Bhubaneswar', 'Bidar', 'Bijapur',
				'Bijnor', 'Bikaner', 'Bilaspur', 'Billhaur', 'Birbhum',
				'Bishnupur', 'Bokaro', 'Bolangir', 'Bongaigaon',
				'Boudh', 'Budaun', 'Bulandshahar', 'Buldhana', 'Bundi',
				'Burhanpur', 'Buxar', 'Cachar', 'Calicut',
				'Chamarajanagar', 'Chamba', 'Chamoli', 'Champawat',
				'Champhai', 'Chandauli', 'Chandel', 'Chandigarh',
				'Chandrapur', 'Changlang', 'Chatra', 'Chhatarpur',
				'Chhindwara', 'Chikballapur', 'Chikkamaglur',
				'Chirang', 'Chitiradurga', 'Chitrakoot', 'Chittoor',
				'Chittorgarh', 'Churachandpur', 'Churu', 'Ernakulam',
				'Cooch Behar', 'Coorg', 'Cuddalore', 'Cuttack',
				'Dadra & Nagar Haveli', 'Dahod', 'Daman', 'Damoh',
				'Dantewada', 'Darbhanga', 'Darjeeling', 'Darrang',
				'Datia', 'Dausa', 'Davanagere', 'Debagarh', 'Dehradun',
				'Deoghar', 'Deoria', 'Dewas', 'Dhamtari',
				'Dhanbad', 'Dhar', 'Dharmapuri', 'Dharuhera',
				'Dhemaji', 'Dhenkanal', 'Dholpur', 'Dhubri', 'Dhule',
				'Dibrugarh', 'Dimapur', 'Dinajpur', 'Dindigul',
				'Dindori', 'Doda', 'Dumka', 'Durg',
				'Durgapur', 'East Godavari', 'East Kameng',
				'East Siang', 'Erode', 'Etah', 'Etawah', 'Faizabad',
				'Faridabad', 'Faridkot', 'Farrukhabad', 'Fatehabad',
				'Fatehgarh Sahib', 'Fatehpur', 'Firozabad', 'Firozpur',
				'Gadag', 'Gadchiroli', 'Gajapati', 'Ganderbal',
				'Gandhinagar', 'Gangtok', 'Ganjam', 'Garhwa',
				'Gautam Buddha Nagar', 'Gaya', 'Geyzing', 'Ghaziabad',
				'Ghazipur', 'Giridih', 'Vasco', 'South Goa', 'Panaji',
				'North Goa', 'Goalpara', 'Godda', 'Golaghat', 'Gonda',
				'Gondiya', 'Gopalganj', 'Gorakhpur', 'Greater Noida',
				'Gulbarga', 'Gumla', 'Guna', 'Guntur', 'Gurdaspur',
				'Guruvayoor', 'Guwahati', 'Gwalior',
				'Hailakandi', 'Hamirpur', 'Hanumangarh', 'Hapur',
				'Harda', 'Hardoi', 'Haridwar', 'Hassan', 'Hathras',
				'Haveri', 'Hawai', 'Hazaribagh', 'Hingoli', 'Hisar',
				'Hooghly', 'Hoshangabad', 'Hoshiarpur', 'Hosur',
				'Howrah', 'Hubli-Dharwad', 'Idukki', 'Imphal',
				'Indore', 'Jabalpur', 'Jagatsinghpur', 'Jaipur',
				'Jaisalmer', 'Jajpur', 'Jalandhar', 'Jalaun',
				'Jalgaon', 'Jalna', 'Jalore', 'Jalpaiguri', 'Jammu',
				'Jamnagar', 'Jamshedpur', 'Jamui', 'Janjgir-Champa',
				'Jashpur', 'Jaunpur', 'Jehanabad', 'Jhabua', 'Jhajjar',
				'Jhalawar', 'Jhansi', 'Jharsuguda', 'Jind', 'Jodhpur',
				'Jorhat', 'Junagadh', 'Jyotiba Phoole Nagar', 'Kadapa',
				'Kaimur', 'Kaithal', 'Kalahandi',
				'Kamrup Metropolitan', 'Kamrup Rural', 'Kanchipuram',
				'Kandhamal', 'Kangra', 'Kanker', 'Kannauj', 'Kannur',
				'Kanpur', 'Kanyakumari', 'Kapurthala', 'Karauli',
				'Karbi Anglong', 'Kargil', 'Karimganj', 'Karimnagar',
				'Karnal', 'Karur', 'Karwar', 'Kasaragod', 'Kathua',
				'Katihar', 'Katni', 'Kaushambi', 'Kawardha',
				'Kendrapara', 'Kendujhar', 'Khagaria', 'Khammam',
				'Khandwa', 'Kharagpur', 'Khargone', 'Kheda', 'Kinnaur',
				'Kishanganj', 'Kishtwar', 'Koderma', 'Kohima',
				'Kokrajhar', 'Kolar', 'Kolhapur', 'Kollam', 'Koppal',
				'Koraput', 'Korba', 'Koriya', 'Kota', 'Kottayam',
				'Krishna', 'Kulgam', 'Kullu', 'Kupwara', 'Kurnool',
				'Kurukshetra', 'Kurung Kumey', 'Kushi Nagar', 'Kutch',
				'Lahaul and Spiti', 'Lakhimpur Kheri', 'Lakhisarai',
				'Lakshadweep', 'Lalitpur', 'Latur', 'Leh', 'Lohardaga',
				'Lohit', 'Lonavala', 'Lower Dibang Valley',
				'Lower Subansiri', 'Lucknow', 'Ludhiana', 'Lunglei',
				'MAU', 'Madhepura', 'Madhubani', 'Madurai',
				'Mahabubnagar', 'Maharajganj', 'Mahasamund',
				'Mahendragarh', 'Mahoba', 'Mainpuri', 'Malappuram',
				'Malda', 'Malkangiri', 'Mandi', 'Mandla', 'Mandsaur',
				'Mandya', 'Mangalore', 'Mansa', 'Marigaon', 'Mathura',
				'Mayurbhanj', 'Medak', 'Meerut', 'Mehsana', 'Mewat',
				'Midnapore', 'Mirzapur', 'Moga', 'Mohali',
				'Mokokchung', 'Mon', 'Moradabad', 'Morena', 'Mukatsar',
				'Munger', 'Murshidabad', 'Mussoorie', 'Muzaffarnagar',
				'Muzaffarpur', 'Mysore', 'Nabarangpur', 'Nadia',
				'Nagaon', 'Nagapattinam', 'Nagaur', 'Nagpur',
				'Nainital', 'Nalanda', 'Nalbari', 'Nalgonda',
				'Namakkal', 'Namchi', 'Nanded', 'Nandurbar',
				'Narayanpur', 'Narmada', 'Narsinghpur', 'Nashik',
				'Navi Mumbai', 'Navsari', 'Nawada', 'Nayagarh',
				'Neemuch', 'Nellore', 'Nizamabad', 'Noida',
				'North Cachar Hills', 'North Tripura', 'Nuapada',
				'Odalguri', 'Ooty', 'Osmanabad', 'Pakur', 'Palakkad',
				'Palamu', 'Pali', 'Palwal', 'Panchkula', 'Panchmahal',
				'Panipat', 'Panna', 'Papum Pare', 'Parbhani',
				'Pashchim', 'Patan', 'Pathanamthitta', 'Patiala',
				'Patna', 'Pauri', 'Perambalur', 'Phek', 'Pilibhit',
				'Pimpri-Chinchwad', 'Pithoragarh', 'Pondicherry',
				'Poonch', 'Porbandar', 'Prakasam', 'Pratapgarh',
				'Pudukkottai', 'Pulwama', 'Purba', 'Purba Champaran',
				'Puri', 'Purnia', 'Purulia', 'Puttaparthi',
				'Raebareli', 'Raichur', 'Raigad', 'Raigarh', 'Raipur',
				'Raisen', 'Rajouri', 'Rajgarh', 'Rajkot',
				'Rajnandgaon', 'Rajsamand', 'Ramanagram',
				'Ramanathapuram', 'Ramban', 'Rampur', 'Ranchi',
				'Rangareddy', 'Ratlam', 'Ratnagiri', 'Rayagada',
				'Reasi', 'Rewa', 'Rewari', 'Rohtak', 'Rohtas',
				'Roorkee', 'Rudraprayag', 'Rudrapur', 'Rupnagar',
				'Sabarkantha', 'Sagar', 'Saharanpur', 'Saharsa',
				'Sahibganj', 'Salem', 'Samastipur', 'Samba',
				'Sambalpur', 'Sangli', 'Sangrur', 'Sant Kabir Nagar',
				'Sant Ravidas Nagar', 'Saran', 'Satara', 'Satna',
				'Sawai', 'Secunderabad', 'Sehore', 'Senapati', 'Seoni',
				'Shahdol', 'Shahjahanpur', 'Shajapur', 'Sheikhpura',
				'Sheohar', 'Sheopur', 'Shillong', 'Shimla', 'Shimoga',
				'Shivpuri', 'Shopian', 'Shravasti', 'Siddharth Nagar',
				'Sidhi', 'Sikar', 'Sindhudurg', 'Sirohi', 'Sirsa',
				'Sitamarhi', 'Sitapur', 'Sivaganga', 'Siwan', 'Solan',
				'Solapur', 'Sonbhadra', 'Sonipat', 'Sonitpur',
				'South Tripura', 'Srikakulam', 'Srinagar',
				'Sriperumbudur', 'Subarnapur', 'Sultanpur',
				'Sundargarh', 'Supaul', 'Surat', 'Surendranagar',
				'Surguja', 'Tamenglong', 'Tapi', 'Tarn Taran',
				'Tawang', 'Tehri Garhwal', 'Thane', 'Thanjavur',
				'The Dangs', 'The Nilgiris', 'Theni', 'Thoothukudi',
				'Thoubal', 'Thrissur', 'Tikamgarh', 'Tinsukia',
				'Tirap', 'Tirunelveli', 'Tirupati', 'Tiruppur',
				'Tiruvallur', 'Tiruvannamalai', 'Tonk', 'Trichy',
				'Trivandrum', 'Tuensang', 'Tumkur', 'Udaipur',
				'Udham Singh Nagar', 'Udhampur', 'Udupi', 'Ujjain',
				'Ukhrul', 'Ulhasnagar', 'Umaria', 'Una', 'Unnao',
				'Upper Dibang Valley', 'Upper Siang',
				'Upper Subansiri', 'Uttar Kannada', 'Uttarkashi',
				'Vadodara', 'Vaishali', 'Valsad', 'Varanasi',
				'Vellore', 'Vidisha', 'Vijayawada', 'Villupuram',
				'Virudhunagar', 'Visakhapatnam', 'Vizianagaram',
				'Warangal', 'Wardha', 'Washim', 'Wayanad',
				'West Godavari', 'West Kameng', 'West Siang',
				'West Tripura', 'Wokha', 'Yamunanagar', 'Yavatmal',
				'Zunheboto', 'Kochi', 'Coimbatore',
				'Adimaly', 'Aluva', 'Amb', 'Ambikapur',
				'Ambulance City', 'Arrah', 'Assolna', 'Balasore',
				'Batala', 'Belur', 'Bhawanigarh', 'Botad', 'Calangute',
				'Candolim', 'Chikhli', 'Chikodi', 'Daman and Diu',
				'Dankuni', 'Dungarpur', 'Fatehgarh Churian', 'Fazilka',
				'Gajrola', 'Gandhidham', 'Gangavathi', 'Ghat',
				'Gokarna', 'Haldwani', 'Himatnagar', 'Isagarh',
				'Jagdalpur', 'Jatani', 'Jhunjhunu', 'Kalyani',
				'Kamakshyanagar', 'Kandivli', 'Karaikal',
				'Karanja Lad', 'Kasganj', 'Khamgaon', 'Khliehriat',
				'Kishangarh', 'Konnagar', 'Lakshmeshwara',
				'Mahabubabad', 'Malout', 'Manimajra', 'Mapusa',
				'Margao', 'Morbi', 'Morinda', 'Motihari', 'Mundi',
				'Nadiad', 'Nawanshahr', 'Palani', 'Pathalgaon',
				'Phagwara', 'Ponda', 'Puttur', 'Rajat Nagari',
				'Rajgangpur', 'Rajpipla', 'Ramanujganj', 'Rawatbhata',
				'Rourkela', 'Sakti', 'Sangola', 'Sargur', 'Sattur',
				'Siliguri', 'Singrauli', 'Sirhind-Fategarh',
				'Sitarganj', 'Sivasagar', 'Sri Ganganagar', 'Sujanpur',
				'Sullia', 'Thiruthangal', 'Thiruvarur', 'Thodupuzha',
				'Tiruchengode', 'Titwala', 'Tuticorin', 'Vapi',
				'Veraval', 'Vyara', 'Zirakpur', 'Bangalore Rural',
				'Kakinada', 'Lakhimpur', 'Narnaul', 'Tirupur',
				'Ambarnath', 'Kozhikode', 'Kanchi', 'Trichur',
				'Thirusivapperoor', 'Thiruvananthapuram', 'Baroda',
				'Cochin', 'Rajat Nagari', 'Akbarpur', 'Pilani' ];
};

Lybrate.StateList.get = function() {
    var states = [ "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
            "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Punjab", "Rajasthan",
            "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" ];
    return states;
};


Lybrate.specializations.get = function(){
	return ['Ayurveda','Dentist','Dermatologist',
	        			'Dietitian/Nutritionist',
	        			'ENT Specialist',
	        			'General Physician','Gynaecologist','Obstetrician',
	        			'Homeopath','Pediatrician','Psychologist',
	        			'Psychiatrist','Ophthalmologist','Orthopedist',
	        			'Sexologist','Veterinarian','Acupressurist', 'Acupuncturist'
 	];
}

Lybrate.symptoms.get = function () {
	return [
		"Acne/Pimples", "Childcare", "Depression", "Diabetes", "Hair Fall", "Pregnancy", "Premature Ejaculation"];
}

Lybrate.treatmentsList.get = function () {
	return [
		"Acne Treatment", "PRP Hair Transplant", "Infertility Treatment", "Knee Pain Treatment ", "Laser Hair Removal",
		"LASIK Surgery", "Piles Treatment", "Root Canal Treatment", "Spinal Surgery"];
}

Lybrate.topSpecializationsWithUrl.get = function(){
    return [{"keyWord":"Dermatologist","pageUrl":"dermatologist","type":"SPCL","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_dermatologist.svg')},
            {"keyWord":"General Physician","pageUrl":"general-physician", "type":"SPCL", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_general_physician.svg')},{"keyWord":"Gynaecologist","pageUrl":"gynaecologist", "type":"SPCL", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_gynaecologist.svg')},
            {"keyWord":"Pediatrician","pageUrl":"pediatrician", "type":"SPCL", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_pediatrician.svg')},{"keyWord":"Psychologist","pageUrl":"psychologist", "type":"SPCL","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_psychologist.svg')},
            {"keyWord":"Sexologist","pageUrl":"sexologist", "type":"SPCL", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_sexologist.svg')},{"keyWord":"Homeopath Specialists","pageUrl":"homeopath", "type":"SPCL", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_homeopathy.svg')},{"keyWord":"Acne/Pimples", "type":"SYPTM", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_acne_pimple.svg')},
            {"keyWord":"Childcare", "type":"SYPTM", "i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_childcare.svg')},{"keyWord":"Depression", "type":"SYPTM","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_depression.svg')},{"keyWord":"Diabetes", "type":"SYPTM","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_diabetes.svg')},
            {"keyWord":"Hair Fall", "type":"SYPTM","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_hairfall.svg')},{"keyWord":"Pregnancy", "type":"SYPTM","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_pregnancy.svg')},{"keyWord":"Premature Ejaculation", "type":"SYPTM","i":Lybrate.getExtResourcePath('imgs/product/svg/ic_search_premature_ejaculation.svg')}];
}

Lybrate.specializationsAlpha.get = function(){
    return ['Aesthetic Medicine Specialist','Allergist/Immunologist','Alternative Medicine Specialist','Anesthesiologist','Audiologist','Bariatrician','Cardiologist','Cosmetic/Plastic Surgeon',
            'Endocrinologist','Epidemiologist','Gastroenterologist','General Surgeon','Geneticist','Geriatrician','Hematologist','Integrated Medicine Specialist','Internal Medicine Specialist',
            'Multi Speciality','Nephrologist','Neurologist','Neurosurgeon','Nuclear Medicine Physician','Occupational Therapist','Oncologist','Oral And Maxillofacial Surgeon',
            'Doctor','Pain Management Specialist','Pathologist','Phlebologist','Physiotherapist','Podiatrist','Proctologist','Pulmonologist','Radiologist','Rheumatologist','Siddha Specialist',
            'Somnologist','Speech Therapist','Super Speciality','Toxicologist','Unani','Urologist','Venereologist','Yoga & Naturopathy Specialist','Abdominoplasty',
            'Addiction Psychiatrist','Adolescent And Child Psychiatrist','Adult Congenital Cardiologist','Adult Psychiatrist','Allergist','Andrologist',
            'Anorectal Disorder','Anorectal Surgeon','Asthma Specialist','Autonomic Neurologist','Bariatric Physician','Bariatric Surgeon','Behavioral Neurologist',
            'Bio-Chemics','Blepharoplasty','Botox','Breast Lift/ Augumentation/ Reduction','Cardiac Anesthesiologist','Cardiac Electrophysiologist','Cardiac Surgeon',
            'Cardiothoracic Surgeon','Cardiovascular And Pulmonary Physiotherapist','Cardiovascular Surgeon','Cataract surgeon','Cheek Augumentation','Chemcial Peel','Chest Physician',
            'Child Birth Educator','Child Psychologist','Chin Augumentation (Mentoplasty)','Clinical Pathologist','Clinical Physiotherapist','Clinical Psychologist','Colorectal Surgeon',
            'Colorectal Surgeon & Proctologist','Computed Tomography (CT Scan)','Cosmetic/ Aesthetic Dentist','Cosmetologist','Counselling Psychologist','Cupping Therapist','Dental Surgeon',
            'Dentofacial Orthopedist','Dermatologist/ Cosmetologist','Dermatopathologist','Dermatosurgeon','Diabetologist','Echocardiologist','Educational Psychologist','Electropathy',
            'Electropathy','Emergency Medicine','Endochrine Surgeon','Endodontist','ENT Surgeon','ENT/ Otolaryngologist','Eye Surgeon','Facelift','Forensic Psychiatrist',
            'Forensic Psychologist','General & Laparoscopic Surgeon','General Neurologist','General Pathologist','Geriatric Neurologist','Geriatric Physiotherapist',
            'Geriatric Psychiatrist','Glaucoma surgeon','Gynaecologic Oncologist','Gynaecological Endoscopy','Hair Transplant Surgeon','Hand Surgeon','Head and Neck Surgery',
            'Headache Specialist','Health Psychologist','Health Specialist','Heart Failure/ Transplant Specialist','Hematologic Oncologist','HIV Specialist','Home Hemodialysis Nurse',
            'Homecare Physiotherapist','Immunodermatologist','Implantologist','Infectious Diseases Physician','Infertility ','Infertility Specialist','Internal Medicine',
            'Intervention Cardiologist','Interventional Pain Management','Interventional Radiologist','IVF (In Vitro Fertilization) Specialist','Joint Replacement Surgeon',
            'Kidney Transplant Specialist','Lactation Consultant','Laryngologist','Laser Specialist','Laser Therapy','Liposuction','Liver Transplant Specialist',
            'Low Vision Specialist','Lower Gastro-Intestinal Surgeon','Medical Cosmetologist','Minimal Access Surgery ','Naturopathic Physician','Neonatal Surgeon','Neonatologist',
            'Nephrologist/ Renal Specialist','Neuro Physiotherapist','Neuro Rehablitation','Neuro Therapy','Neuro-Oncologist','Neuroendocrinologist','Neuroimaging Specialist',
            'Neurointensive Care','Neurophysiologist','Neuropsychiatrist','Neuropsychologist','Non-Invasive Conservative Cardiac Care Specialist','Non-invasive Cardiologist',
            'Nuclear Cardiologist','Obesity Specialist','Occupational Psychologist',
            'Oncologist/ Cancer Specialist','Optician','Optometrist','Oral & Maxillofacial Pathologist','Oral & Maxillofacial Pathology','Oral Medicine and Radiology','Orthodontist',
            'Orthopedic Physiotherapist','Orthopedic Surgeon','Otologist/ Neurotologist','Ozone Therapy','Paediatric & Adolescent Gynaecologist','Pain Management','Panchakarma',
            'Past Life Regression','Pediatric Cardiologist','Pediatric Dentist','Pediatric Dermatologist','Pediatric Endocrinologist','Pediatric Gastroenterologist','Pediatric Laproscopy',
            'Pediatric Neurologist','Pediatric Oncologist','Pediatric Ophthalmologist','Pediatric Orthopedist','Pediatric Orthopedist','Pediatric Otolaryngologist','Pediatric Physiotherapist',
            'Pediatric Pulmonologist','Pediatric Surgeon','Pediatric Thoracoscopy','Pediatric Urologist','Perinatologist','Periodontist','Physiatrist','Physical medicine and rehabilitation',
            'Prosthodontist','Psychotherapist','Public Health Dentist','Rabies Specialist','Radiation Oncologist','Refractive surgeon','Regenerative Medicine','Renal Dietician','Renal Nurse',
            'Reproductive Endocrinologist (Infertilty)','Rhinologist','Rhinoplasty','Shoulder Specialist','Shoulder Surgeon','Somnologist (Sleep Specialist)','Sonologist','Speech Therapy',
            'Spinal Pain Management','Spine Surgery','Sports and Musculoskeletal Physiotherapist','Sports Nutritionist','Sujok','Surgical Gastroenterologist','Surgical Oncologist',
            'Therapeutic Laser','Thighplasty (thigh lift)','Thoracic (Chest) Surgeon','Thyroid Specialist','Transfusion Medicine','Transplant Surgeon','Travellers Medicine','Trichologist',
            'Tropical Vaccination','Ultrasonologist','Ultrasonologist','Upper Gastro-Intestinal Surgeon','Urological Surgeon','Vascular Surgery','Veterinary Physician','Veterinary Surgeon',
            'Vitiligo Surgeon','Water Cure Therapist','Women Health Physiotherapist ','Yoga Therapist' 
            ];
}

Lybrate.specializationsAll.get = function(){
	return Lybrate.specializations.get().concat(Lybrate.specializationsAlpha.get())
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}