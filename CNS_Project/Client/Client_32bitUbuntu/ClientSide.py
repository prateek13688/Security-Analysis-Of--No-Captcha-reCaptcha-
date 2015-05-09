from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
import pyautogui
import time
from daemon import runner
import random
import string 
import requests

i = 1
sleepTime = 3600 # Time in seconds, Sleep time is set to 1 hour
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

def moveMouse_typeKBD():
	pyautogui.FAILSAFE = True
	mouseX , mouseY = pyautogui.position()
	pyautogui.moveTo(mouseX + 1000, mouseY-1000, duration=1)
	mouseX , mouseY = pyautogui.position()
	time.sleep(2)
	pyautogui.rightClick(x=mouseX, y=mouseX)
	time.sleep(5)
	pyautogui.doubleClick(x=mouseX, y=mouseY)
	time.sleep(5)
	pyautogui.tripleClick(x=mouseX - 400, y=mouseY + 500)
	time.sleep(5)
	pyautogui.press('left') 
	pyautogui.press('alt') 
	time.sleep(5) 

def autoclick_Page():
	serverURL = "http://192.168.0.20:8080" # Server is started on 192.168.0.20 with port number 8080 
	moveMouse_typeKBD()
	driver = webdriver.Chrome("/usr/chromedriver") 
	driver.get(serverURL+"/Captcha/")
	driver.implicitly_wait(10)
	driver.switch_to_frame(driver.find_element_by_tag_name("iframe"))
	elem = driver.find_element_by_xpath("//span[@id= 'recaptcha-anchor']")
	elem1 = elem.find_element_by_class_name('recaptcha-checkbox-checkmark')
	elem1.click()
	driver.switch_to_default_content()
	time.sleep(6)
	elem2 = driver.find_element_by_xpath("//table[@class= ' gc-bubbleDefault pls-container']")
	if elem2 is None:
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
		r = requests.post(serverURL + "/Captcha/logger", data={'Status':'Success'})
	else:
		r = requests.post(serverURL+ "/Captcha/logger", data={'Status':'Failed'})
	driver.close()
while True:
	time.sleep(sleepTime)
	autoclick_Page()


