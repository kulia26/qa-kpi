from selenium import webdriver
import time
import unittest
from selenium.webdriver import ActionChains
from Pages.todosPage import TodosPage
from Functions.functions import Functions, arr

class TodosTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Firefox()
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def setUp(self):
        Functions.add_tasks(self)

    def test_1_active_tasks(self):
        print("Test 1: should allow user to see active tasks")

        self.driver.get('http://todomvc.com/examples/typescript-angular/#/active')
        page = TodosPage(self.driver)
        tasksFromPage = page.get_tasks()[:-1]
        self.assertEqual(tasksFromPage, arr)
        print("received: " + str(tasksFromPage))
        print("input: " + str(arr))
        time.sleep(3)

    def test_2_completed_tasks(self):
        print("Test 2: should allow user to complete task")

        self.driver.get('http://todomvc.com/examples/typescript-angular/#/active')
        button = self.driver.find_element_by_xpath("//li[1]/div/input")
        button.click()
        time.sleep(1)
        self.driver.get('http://todomvc.com/examples/typescript-angular/#/completed')
        page = TodosPage(self.driver)
        tasks_from_page_completed = page.get_tasks()[:-1]
        completed_task = arr[:-2] #eat
        self.assertEqual(tasks_from_page_completed, completed_task)
        print("received: " + str(tasks_from_page_completed))
        print("input: " + str(completed_task))
        time.sleep(3)

    def test_3_delete_tasks(self):
        print("Test 3: should allow user to delete task")

        element = self.driver.find_element_by_xpath("//label[contains(.,'go to the gym')]")
        action = ActionChains(self.driver)
        action.move_to_element(element).perform()
        time.sleep(2)
        button = self.driver.find_element_by_xpath("//li[3]/div/button")
        button.click()
        time.sleep(1)
        page = TodosPage(self.driver)
        tasks_from_page_delete = page.get_tasks()[:-1]
        word = arr[:-1]  # eat, walk the dog
        self.assertEqual(tasks_from_page_delete, word)
        print("received: " + str(tasks_from_page_delete))
        print("input: " + str(word))
        time.sleep(3)

    def tearDown(self):
        Functions.delete_all_tasks(self)

    @classmethod
    def tearDownClass(cls):
        print("All tests Completed")
        cls.driver.close()
        cls.driver.quit()


if __name__ == '__main__':
    unittest.main()