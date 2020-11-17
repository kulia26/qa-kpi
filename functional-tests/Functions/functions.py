from selenium import webdriver
import time
from Pages.todosPage import TodosPage

arr = ['eat', 'walk the dog', 'go to the gym']

class Functions():

    def add_tasks(self):

        driver = self.driver

        driver.get('http://todomvc.com/examples/typescript-angular/#/')
        task = TodosPage(driver)
        for value in arr:
            task.enter_task(value)
            time.sleep(2)

    def delete_all_tasks(self):
        driver = self.driver

        driver.get('http://todomvc.com/examples/typescript-angular/#/')
        button = driver.find_element_by_xpath("//label[contains(.,'Mark all as complete')]")
        button.click()
        time.sleep(2)
        button = driver.find_element_by_xpath("// button[contains(., 'Clear completed')]")
        button.click()
        print("Test completed")