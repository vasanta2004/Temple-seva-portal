import re
import os

filepath = r"c:\Users\VASANTA M\TEMPLE\frontend\src\pages\AdminDashboard.jsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Add ivoryGold to themes
themes_patch = """
  ivoryGold: {
    name: 'Divine Ivory',
    primary: '#FDFBF7',
    secondary: '#D4AF37',
    glowColor: 'bg-[#D4AF37]/15',
    glowPulse: 'rgba(212,175,55,0.15)',
    gradient: 'from-[#D4AF37] to-[#B8942E]',
    sidebarActive: 'from-[#F5F0E6] to-[#FAFAFA]',
    accentText: 'text-[#B8942E]',
    accentBg: 'bg-[#D4AF37]/10',
    accentBorder: 'border-[#D4AF37]/30',
    avatarBg: 'bg-[#F5F0E6] text-[#B8942E]',
    pillColor: 'bg-[#D4AF37]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)]',
    inputFocus: 'focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/30',
    btnGradient: 'from-[#D4AF37] to-[#B8942E]',
    isLight: true
  },
  maroon: {"""

content = content.replace("  maroon: {", themes_patch)

# Change default theme in state initialization
content = content.replace("localStorage.getItem('temple_admin_theme') || 'amber'", "localStorage.getItem('temple_admin_theme') || 'ivoryGold'")

# Add the admin-dashboard class and theme toggle to main container
content = content.replace(
    'className="flex h-screen bg-[#040306] text-white overflow-hidden font-sans relative"',
    'className={`admin-dashboard ${currentTheme.isLight ? \'theme-light\' : \'theme-dark\'} flex h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] overflow-hidden font-sans relative`}'
)

# Text replacements
replacements = [
    (r'bg-\[\#040306\]', 'bg-[var(--admin-bg)]'),
    (r'text-white', 'text-[var(--admin-text)]'),
    (r'text-gray-300', 'text-[var(--admin-text)]'),
    (r'text-gray-400', 'text-[var(--admin-text-muted)]'),
    (r'text-gray-500', 'text-[var(--admin-text-muted)]'),
    (r'bg-white/\[0\.01\]', 'bg-[var(--admin-card-bg)]'),
    (r'bg-white/\[0\.02\]', 'bg-[var(--admin-input-bg)]'),
    (r'bg-white/\[0\.03\]', 'bg-[var(--admin-card-bg)]'),
    (r'bg-white/\[0\.04\]', 'bg-[var(--admin-hover-bg)]'),
    (r'bg-white/5', 'bg-[var(--admin-hover-bg)]'),
    (r'border-white/5', 'border-[var(--admin-border)]'),
    (r'border-white/10', 'border-[var(--admin-border)]'),
    (r'border-white/15', 'border-[var(--admin-border)]'),
    (r'border-white/20', 'border-[var(--admin-border-focus)]'),
    (r'border-white/30', 'border-[var(--admin-border-focus)]'),
    (r'bg-\[\#07050b\]/45', 'bg-[var(--admin-sidebar)]'),
    (r'bg-\[\#0c0c0e\]/30', 'bg-[var(--admin-sidebar)]'),
    (r'bg-black/40', 'bg-transparent'),
    (r'placeholder-gray-600', 'placeholder-[var(--admin-text-muted)]'),
    (r'ring-white', 'ring-[var(--admin-border-focus)]'),
    (r'ring-offset-black', 'ring-offset-[var(--admin-bg)]'),
]

for old, new in replacements:
    content = re.sub(old, new, content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Refactoring complete.")
