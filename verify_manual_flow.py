from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            print("Navigating to Onboarding...")
            page.goto("http://localhost:3000/")
            page.wait_for_selector("text=The Story Begins with You")

            print("Clicking Manual Setup...")
            page.click("a[href='/onboarding/manual']")

            page.wait_for_selector("text=Advanced Story Initialization")
            print("Manual Setup Page Loaded.")

            # Fill form
            print("Filling form...")
            page.fill("input[placeholder='e.g. The Void Chronicles']", "Automated Test Project")
            page.fill("input[placeholder='e.g. Sci-Fi']", "Cyberpunk Thriller")

            # Click Initialize
            print("Clicking Initialize...")
            page.click("text=Initialize Project")

            # Check for Generating Page
            print("Waiting for Generating Page...")
            page.wait_for_url("**/onboarding/generating")
            print("Generating Page Loaded.")

            # Wait for Redirect to Editor
            print("Waiting for Redirect to Editor (approx 3s)...")
            page.wait_for_url("**/editor", timeout=10000)
            print("Editor Page Loaded.")

            # Allow some time for data fetch
            time.sleep(2)

            # Verify Content in Editor
            print("Verifying Editor Content...")
            page.wait_for_selector("text=Automated Test Project", timeout=5000)

            page.screenshot(path="manual_flow_success.png")
            print("Success! Screenshot saved to manual_flow_success.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="manual_flow_error.png")
            print("Screenshot saved to manual_flow_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
