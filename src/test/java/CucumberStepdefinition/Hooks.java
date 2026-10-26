package CucumberStepdefinition;

import io.cucumber.java.After;
import io.cucumber.java.Before;


public class Hooks {

    // Sirf browser open karega
    @Before("@NeedLogin")
    public void setUp() throws Exception {
        BaseSteps.initializeDriver();
        if (BaseSteps.driver != null) {
            BaseSteps.driver.manage().deleteAllCookies();
        }
    }
    @After
    public void tearDown() {
        BaseSteps.quitDriver();
    }
}

