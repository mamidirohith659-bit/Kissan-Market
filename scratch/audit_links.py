import os
import re

def check_paths(root_dir):
    report = []
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find href and src
        links = re.findall(r'(?:href|src)=["\'](.*?)["\']', content)
        
        for link in links:
            if link.startswith('http') or link.startswith('#') or link.startswith('mailto:') or link.startswith('tel:'):
                continue
            
            # Resolve path
            if link.startswith('/'):
                # Treat as relative to root_dir for local auditing
                target_path = os.path.join(root_dir, link.lstrip('/'))
            else:
                target_path = os.path.abspath(os.path.join(os.path.dirname(html_file), link))
            
            if not os.path.exists(target_path):
                # Check if it's a known issue like ../../../..
                report.append({
                    'file': os.path.relpath(html_file, root_dir),
                    'link': link,
                    'status': 'BROKEN',
                    'resolved': target_path
                })
    
    return report

root = r'c:\Users\RUTHIKA PUTTA\OneDrive\Desktop\Kissan-Market'
results = check_paths(root)

for res in results:
    print(f"File: {res['file']} | Link: {res['link']}")
