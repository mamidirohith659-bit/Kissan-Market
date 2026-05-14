import os
import re

def check_js_navigation(root_dir):
    report = []
    js_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.js') or file.endswith('.html'):
                js_files.append(os.path.join(root, file))
    
    for js_file in js_files:
        with open(js_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find window.location.href or .assign
        navs = re.findall(r'window\.location\.(?:href|assign)\s*=\s*["\'](.*?)["\']', content)
        
        for nav in navs:
            if nav.startswith('http') or nav.startswith('#'):
                continue
            
            # Resolve path
            target_path = os.path.abspath(os.path.join(os.path.dirname(js_file), nav))
            
            if not os.path.exists(target_path):
                report.append({
                    'file': os.path.relpath(js_file, root_dir),
                    'nav': nav,
                    'status': 'BROKEN'
                })
    
    return report

root = r'c:\Users\RUTHIKA PUTTA\OneDrive\Desktop\Kissan-Market'
results = check_js_navigation(root)

for res in results:
    print(f"File: {res['file']} | Nav: {res['nav']}")
