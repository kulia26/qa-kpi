from selenium.webdriver.common.keys import Keys

class TodosPage():

    def __init__(self, driver):
        self.driver = driver

        self.input_textbox_css_selector = ".new-todo"
        self.list_class_name = "ng-binding"

    def enter_task(self, task):
        self.input = self.driver.find_element_by_css_selector(self.input_textbox_css_selector).clear()
        self.input = self.driver.find_element_by_css_selector(self.input_textbox_css_selector)
        self.input.send_keys(task)
        self.input.send_keys(Keys.ENTER)

    def get_tasks(self):
        self.list = self.driver.find_elements_by_class_name(self.list_class_name)
        arr = []

        for self.li in self.list:
            arr.append(self.li.text)
        return arr