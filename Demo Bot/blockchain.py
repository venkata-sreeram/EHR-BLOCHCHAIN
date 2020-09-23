from flask import Flask
app = Flask(__name__)
from selenium import webdriver
import time 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@app.route('/hss')
def hello_wor():
    #executable_path = "/home/monalisha/Desktop/blockchain a-z/ChromeDriver/chromedriver"
    #os.environ["webdriver.chrome.driver"] = executable_path

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--user-data-dir=./User_Data')
    #capabilities = DesiredCapabilities.CHROME.copy()
    #capabilities['acceptSslCerts'] = True
    #capabilities['acceptInsecureCerts'] = True

    #chrome_options.add_extension('/home/monalisha/Documents/MetaMask_v7.7.8.crx')


 
    browser = webdriver.Chrome("/home/monalisha/Desktop/blockchain a-z/ChromeDriver/chromedriver",chrome_options=chrome_options)
  
    # To maximize the browser windoptions = webdriver.ChromeOptions();
    #options.add_argument('--user-data-dir=./User_Data')
    #browser = webdriver.Chrome(chrome_options=options) 
    browser.maximize_window() 
    #Add="0xae89b20F0a649a100c1420e52FAa9356e3452F6D"
    #addr="0xB567a85Fd70754554AE68e8b721919320b6f6831"
    #hash="QmQVuR3WLUzUX6PjexVSmzU4SbLTMZY6RBZzcGEmZTPimo"
    browser.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html')
    time.sleep(3)
    
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID,'password'))).send_keys("rahulmona")
    time.sleep(3)
    browser.find_element_by_xpath('//*[@id="app-content"]/div/div[4]/div/div/button').click()
    
    time.sleep(3)
    browser.get('http://localhost:3000/')
    time.sleep(5) 
    patient_login  = browser.find_element_by_id("Patient")
    patient_login.click()
    time.sleep(5)

    #user=browser.find_element_by_id("Address")
    #user.send_keys(Add)

    submit_a=browser.find_element_by_id("Log In")
    time.sleep(2)
    submit_a.click()
    time.sleep(2)

    #permit_doc=browser.find_element_by_id("Permit Doc")
    #permit_doc.click()
    browser.get("http://localhost:3000/patient/viewrecords/permitdoc")
    browser.get("http://localhost:3000/patient/viewrecords/permitdoc")
    time.sleep(5);
    #addr_v=browser.find_element_by_id("Enter address of doctor")
    #addr_v.send_keys(addr)

    #hash_k=browser.find_element_by_id("Enter the hash of the file to view record")
    #hash_k.send_keys(hash)

    #submit_b=browser.find_element_by_id("Submit_hash")
    #submit_b.click()
    #time.sleep(2)
    
    #print('Permission Granted') 
    browser.close()
    
    

    return "done"
app.run()
