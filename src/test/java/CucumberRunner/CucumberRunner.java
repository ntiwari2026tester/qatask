package CucumberRunner;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/java/CucumberFeatureFle/CucumberFeature",

        glue = "CucumberStepdefinition",
        tags = "@PatientRegistrationTest" ,
        plugin = {"pretty", "html:target/cucumber-report.html"}
)
public class CucumberRunner {
}
