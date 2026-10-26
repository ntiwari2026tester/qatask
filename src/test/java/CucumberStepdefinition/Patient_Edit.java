package CucumberStepdefinition;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import static CucumberStepdefinition.BaseSteps.driver;
import static CucumberStepdefinition.BaseSteps.prop;

public class Patient_Edit {

    public class editPatient {
        @When("the user navigates to Edit Page")
        public void the_user_navigates_to_edit_page() throws InterruptedException {
            Thread.sleep(1000);
            driver.findElement(By.className("i-Edit")).click();
        }
        @Then("the user should see the message showing")
        public void the_user_should_see_the_message_showing() throws InterruptedException {
            System.out.println("Patient Registration Page Opened Successfully.");
            driver.findElement(By.id("title")).sendKeys(prop.getProperty("title"));
            Thread.sleep(1000);
            driver.findElement(By.name("firstName")).sendKeys(prop.getProperty("firstName"));
            driver.findElement(By.name("middleName")).sendKeys(prop.getProperty("middleName"));
            Thread.sleep(1000);
            driver.findElement(By.name("lastName")).sendKeys(prop.getProperty("lastName"));
            Thread.sleep(1000);
            driver.findElement(By.id("agey")).sendKeys(prop.getProperty("agey"));
            Thread.sleep(1000);
            driver.findElement(By.id("agem")).sendKeys(prop.getProperty("agem"));
            Thread.sleep(1000);
            driver.findElement(By.id("aged")).sendKeys(prop.getProperty("aged"));
            Thread.sleep(1000);
            driver.findElement(By.id("phone")).sendKeys(prop.getProperty("phone"));
            List<WebElement> Relation = driver.findElements(By.xpath("//select[@id=\"relationWithPatient\"]//option"));
            System.out.println("1: " + Relation);
            System.out.println("No. of relation type in DropDown is:" + Relation.size());
            for (WebElement Relations : Relation) {
                System.out.println(Relations.getText());           }
            Relation.get(Integer.parseInt(prop.getProperty("relationWithPatient"))).click(); // Using the property for index
            Thread.sleep(1000);
//        driver.findElement(By.name("relativeName")).sendKeys(prop.getProperty("relativeName"));
//        driver.findElement(By.id("emergencyContact")).sendKeys(prop.getProperty("emergencyContact"));
//        driver.findElement(By.id("ward")).sendKeys(prop.getProperty("ward"));
//        driver.findElement(By.id("street")).sendKeys(prop.getProperty("street"));
            //update karne ke liye

            // Relative Name
            WebElement relativeName = driver.findElement(By.name("relativeName"));
            relativeName.clear();
            Thread.sleep(2000);
            relativeName.sendKeys(prop.getProperty("relativeName"));

// Emergency Contact
            WebElement emergencyContact = driver.findElement(By.id("emergencyContact"));
            emergencyContact.clear();
            Thread.sleep(2000);
            emergencyContact.sendKeys(prop.getProperty("emergencyContact"));

// Ward
//        WebElement ward = driver.findElement(By.id("ward"));
//        ward.clear();
//        Thread.sleep(2000);
//        ward.sendKeys(prop.getProperty("ward"));
//        UHID
            driver.findElement(By.id("hospitalUHID")).sendKeys("74125415698541265");

// Street
            WebElement street = driver.findElement(By.name("street"));
            street.clear();
            Thread.sleep(2000);
            street.sendKeys(prop.getProperty("street"));
//        List<WebElement> dist = driver.findElements(By.xpath("//select[@id=\"citylist\"]//option"));
//        Thread.sleep(1000);
//        dist.get(Integer.parseInt(prop.getProperty("city"))).click(); //Using the property for city index
//        for (WebElement distlist : dist) {
//            System.out.println("distlist: " + distlist.getText());          }
//        List<WebElement> state = driver.findElements(By.xpath("//select[@id=\"state\"]//option"));
//        state.get(Integer.parseInt(prop.getProperty("state"))).click(); // Using the property for state index
//        driver.findElement(By.id("aadhaarNo")).sendKeys(prop.getProperty("aadhaarNo"));
//        WebElement aadhar = driver.findElement(By.id("aadhaarNo"));
//        aadhar.clear();
//        aadhar.sendKeys(prop.getProperty("aadhaarNo"));
            Thread.sleep(1000);
            driver.findElement(By.id("submitandcontinue_button")).click();     //New patient save
            driver.findElement(By.name("submit")).click();
        }
    }
}
