package CucumberStepdefinition;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;

import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static CucumberStepdefinition.BaseSteps.driver;
public class Login_Module_test {


    public Login_Module_test() throws Exception {
// Hooks se driver handle ho raha hai
    }
    @Given("User is on Login Page")
    public void user_is_on_login_page() throws InterruptedException {
        driver.get(BaseSteps.prop.getProperty("login.url"));
        System.out.println("The page title is : " + driver.getTitle());
    }
    @When("User enter valid {string} and {string} and {string}")
    public void user_enter_valid_and_and(String facility, String username, String password) throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        wait.until(ExpectedConditions.elementToBeClickable(By.id("facility")));
        driver.findElement(By.id("facility")).clear();
        driver.findElement(By.id("facility")).sendKeys(facility);
        driver.findElement(By.id("username")).clear();
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).clear();
        driver.findElement(By.id("password")).sendKeys(password);
    }
    @And("clicks on login button")
    public void clicks_on_login_button() throws InterruptedException {
        driver.findElement(By.xpath("//input[@type=\"submit\"]")).click();
        Thread.sleep(2000);
    }
    @Then("User should be navigated to the home page")
    public void user_should_be_navigated_to_the_home_page() throws InterruptedException {
        // 1. Ya toh aap URL check kar sakte hain
        String expectedUrl = "https://cmch.sharphubspoke.com:4040/worklistorder";
        String actualUrl = driver.getCurrentUrl();
        Assert.assertEquals(actualUrl, expectedUrl);
        Thread.sleep(2000); // Navigation/Loading wait

        // 2. Ya fir Home Page ka koi specific element (jaise Dashboard text ya Logo) verify kar sakte hain
        // WebElement dashboardTitle = driver.findElement(By.id("dashboard-title"));
        // Assert.assertTrue(dashboardTitle.isDisplayed());
        if (actualUrl.contains("worklistorder")) {
            System.out.println("Successful Login to Dashboard: " + actualUrl);
            Assert.assertTrue(actualUrl.contains("worklistorder"));
        } else {
            System.out.println("Execution for Invalid Login Dataset completed. Current URL: " + actualUrl);
            Assert.assertTrue(actualUrl.contains("login") || actualUrl.contains("4040"));
        }
    }

}

