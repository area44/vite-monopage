import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('http://localhost:5173')

        # XL breakpoint
        await page.set_viewport_size({"width": 1440, "height": 1080})
        await page.screenshot(path='verification/no_sidebar_xl.png')

        # LG breakpoint
        await page.set_viewport_size({"width": 1024, "height": 1080})
        await page.screenshot(path='verification/no_sidebar_lg.png')

        await browser.close()

asyncio.run(main())
