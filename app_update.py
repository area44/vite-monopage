import sys

with open('src/app/app.tsx', 'r') as f:
    content = f.read()

# Add Left Spacer and keep Right Sidebar
search_text = """      {/* Main Content Layout */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-10 xl:gap-16">

          {/* Center Main Content */}"""

replace_text = """      {/* Main Content Layout */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-10 xl:gap-16">
          {/* Left Spacer - keeps main content centered */}
          <div className="hidden w-64 shrink-0 xl:block" />

          {/* Center Main Content */}"""

if search_text in content:
    content = content.replace(search_text, replace_text)
else:
    print("Search block not found")
    sys.exit(1)

with open('src/app/app.tsx', 'w') as f:
    f.write(content)
