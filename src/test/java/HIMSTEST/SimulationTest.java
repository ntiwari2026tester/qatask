package HIMSTEST;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.FileInputStream;
import java.time.Duration;
import java.util.List;
import java.util.Properties;

import static CucumberStepdefinition.BaseSteps.prop;

public class SimulationTest {

    public static void handleDuplicateOrderPopup(WebDriver driver) {

            try {

                WebDriverWait popupWait =
                        new WebDriverWait(driver, Duration.ofSeconds(3));

                WebElement okButton = popupWait.until(
                        ExpectedConditions.elementToBeClickable(
                                By.cssSelector("button.swal2-confirm")
                        )
                );
                okButton.click();
                System.out.println("Duplicate Order Popup -> OK clicked.");
                // Popup close hone ka wait
                popupWait.until(
                        ExpectedConditions.invisibilityOfElementLocated(
                                By.cssSelector(".swal2-popup")
                        )
                );
            } catch (TimeoutException e) {

                // Popup nahi aaya
                System.out.println("No Duplicate Order Popup.");
            }
        }
        public static void main (String[]args) throws InterruptedException {

            WebDriver driver = new ChromeDriver();
            try {
                driver.manage().window().maximize();
                driver.get("https://hims.themediq.com:4097");
                WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
                // Username
                wait.until(ExpectedConditions.visibilityOfElementLocated(
                        By.name("username")
                )).sendKeys("admin@cmch.cmh");
                // Password
                wait.until(ExpectedConditions.visibilityOfElementLocated(
                        By.id("password")
                )).sendKeys("demo@123");

                System.out.println("Please enter CAPTCHA manually...");

                // click on CAPTCHA field
                wait.until(ExpectedConditions.elementToBeClickable(
                        By.id("captchaInput")
                )).click();
                // CAPTCHA Entered Manualy
                wait.until(driver1 -> {
                    try {
                        WebElement captcha =
                                driver1.findElement(By.id("captchaInput"));
                        String value = captcha.getAttribute("value");
                        return value != null && value.trim().length() == 6;
                    } catch (Exception e) {
                        // Locate Element When refresh CAPTCHA
                        return false;
                    }
                });
                System.out.println("CAPTCHA entered.");
                // SIGN IN button ko fresh locate karo
                WebElement signIn = wait.until(
                        ExpectedConditions.elementToBeClickable(
                                By.xpath("//button[@type='submit' and normalize-space()='SIGN IN']")
                        )
                );
                signIn.click();
                System.out.println("SIGN IN clicked.");
                Thread.sleep(2000);
                String currentUrl = driver.getCurrentUrl();
                if (currentUrl.contains("auth-server.themediq.com:4096/login")) {
                    System.out.println("❌ WRONG CAPTCHA ENTERED!");
                } else {
                    System.out.println("✅ CAPTCHA ACCEPTED!");
                }
                System.out.println("Current URL: " + currentUrl);
                Thread.sleep(2000);
                WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(10));
                shortWait.until(ExpectedConditions.elementToBeClickable(
                        By.id("system-release-dismiss")
                )).click();
                Thread.sleep(2000);
                driver.findElement(By.xpath("//a[contains(@class,'nav-link') and contains(.,'Patient')]")).click();
                Thread.sleep(2000);
                driver.findElement(By.xpath("//li[@id='patientMenu']//a[contains(@href,'/patient/patient-search')]")).click();
                Thread.sleep(2000);
                driver.findElement(By.xpath("//button[normalize-space()='Add']")).click();
                System.out.println("Patient Registration Page Opened Successfully.");
                driver.findElement(By.id("title")).sendKeys("Mr.");
                Thread.sleep(1000);
                driver.findElement(By.name("firstName")).sendKeys("Nitesh");
                driver.findElement(By.name("middleName")).sendKeys("kumar");
                Thread.sleep(1000);
                driver.findElement(By.name("lastName")).sendKeys("verma");
              driver.findElement(By.id("relationWithPatient")).sendKeys("S/o");
              driver.findElement(By.id("relativeName")).sendKeys("test");
              driver.findElement(By.name("gender")).sendKeys("Male");
              driver.findElement(By.id("primaryContact")).sendKeys("9854154785");
              driver.findElement(By.id("ageYears")).sendKeys("15");
              driver.findElement(By.id("ageMonths")).sendKeys("10");
              driver.findElement(By.id("ageDays")).sendKeys("15");
              driver.findElement(By.id("saveContinueBtn")).click();

                driver.findElement(By.partialLinkText("Billing")).click();
                Thread.sleep(2000);
                driver.findElement(By.partialLinkText("payment")).click();
                Thread.sleep(2000);
//            driver.findElement(By.id("services")).sendKeys("cbc");
//            wait.until(ExpectedConditions.elementToBeClickable(
//                    By.xpath("//div[@id='servicesBox']//div[@data-name='Cbc']")
//            )).click();
//            Thread.sleep(2000);
//            driver.findElement(By.id("services")).sendKeys("liver");
//
//            wait.until(ExpectedConditions.elementToBeClickable(
//                    By.xpath("//div[@id='servicesBox']//div[@data-name='Liver function test: LFt']")
//            )).click();
                Thread.sleep(2000);
                WebElement billType = driver.findElement(By.id("billType"));
                Select select = new Select(billType);
                select.selectByValue("PARTIAL");
                Thread.sleep(2000);
// Search test
                WebElement services = wait.until(
                        ExpectedConditions.elementToBeClickable(By.id("services"))
                );
                // CBC

                services.sendKeys("cbc");
                wait.until(ExpectedConditions.elementToBeClickable(
                        By.cssSelector("#servicesBox .service-item")
                )).click();
                handleDuplicateOrderPopup(driver);

// LIVER
                services.clear();
                services.sendKeys("liver");
                wait.until(ExpectedConditions.elementToBeClickable(
                        By.cssSelector("#servicesBox .service-item")
                )).click();
                handleDuplicateOrderPopup(driver);
//ELFA
                services.clear();
                services.sendKeys("ELFA");

                wait.until(ExpectedConditions.elementToBeClickable(
                        By.cssSelector("#servicesBox .service-item")
                )).click();
                handleDuplicateOrderPopup(driver);
                Thread.sleep(2000);
                driver.findElement(By.id("submitButton")).click();
                Thread.sleep(2000);
//            driver.findElement(By.partialLinkText("OK")).click();
//            driver.switchTo().alert().accept();
                WebElement okButton = wait.until(
                        ExpectedConditions.elementToBeClickable(
                                By.className("confirm")
                        )
                );

                okButton.click();
            } finally {
                Thread.sleep(2000);
//             driver.quit();
            }
        }
    }

