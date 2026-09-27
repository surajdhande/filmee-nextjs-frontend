// @ts-check
const { test, expect } = require("@playwright/test");

const BASE = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

test.describe("Filmee smoke (per role entry)", () => {
  test("login page loads", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await expect(page).toHaveURL(/login/);
  });

  test("search page loads", async ({ page }) => {
    await page.goto(`${BASE}/search`);
    await expect(page.getByRole("heading", { name: "Search Everything" })).toBeVisible();
  });

  test("filmmaker dashboard redirects unauthenticated users", async ({ page }) => {
    await page.goto(`${BASE}/dashboard/filmmaker`);
    await page.waitForURL(/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/login/);
  });

  test("investor dashboard redirects unauthenticated users", async ({ page }) => {
    await page.goto(`${BASE}/dashboard/investor`);
    await page.waitForURL(/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/login/);
  });

  test("talent dashboard redirects unauthenticated users", async ({ page }) => {
    await page.goto(`${BASE}/dashboard/talent`);
    await page.waitForURL(/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/login/);
  });
});
