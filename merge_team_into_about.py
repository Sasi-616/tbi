import re

# 1. Read about.html and extracted files
with open('about.html', 'r', encoding='utf-8') as f:
    about_c = f.read()

team_section = open('extracted_team_section.html', 'r', encoding='utf-8').read()
team_script = open('filter_team_func.html', 'r', encoding='utf-8').read()

# In about.html, replace the old placeholder Board section with the full rich team section
# Old placeholder section starts around <!-- Leadership & Board of Directors (id="bod") -->
old_board_pattern = r'<!-- Leadership & Board of Directors[\s\S]*?(?=<!-- Universal Footer)'
if re.search(old_board_pattern, about_c):
    merged_section = f'''<!-- Full Team Showcase Merged from team.html -->
  <div id="team" class="scroll-mt-24"></div>
{team_section}
'''
    about_c = re.sub(old_board_pattern, merged_section, about_c)
    print("Injected full team section into about.html")
else:
    print("Old board pattern not found in about.html")

# Inject team filter script before </body> if not present
if 'function filterTeam' not in about_c:
    about_c = about_c.replace('</body>', f'{team_script}\n</body>')
    print("Injected filterTeam script into about.html")

# Update about.html hero banner to pure transparent with dsc05706
about_hero_old = r'<!-- Hero Banner -->[\s\S]*?</section>'
about_hero_new = '''<!-- Hero Banner (Pure Transparent, Pristine Light Mode) -->
  <section class="relative min-h-[480px] flex items-end pb-16 -mt-28 pt-36 lg:pt-44 overflow-hidden bg-transparent text-white">
    <div class="absolute inset-0 z-0">
      <img src="assets/website_optimized/dsc05706.jpg" alt="Vignan TBI Incubation Facility" class="w-full h-full object-cover object-center filter brightness-100 contrast-105 scale-100">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none"></div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="max-w-3xl space-y-4">
        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-brand-orange bg-black/50 backdrop-blur-md border border-brand-orange/40">
          <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
          ABOUT VFSTR TBI COUNCIL · SECTION 8 NON-PROFIT
        </span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          An Incubator Associated with a Premier University
        </h1>
        <p class="text-gray-100 text-sm sm:text-base leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          VFSTR TBI Council empowers innovators, students, and researchers across Andhra Pradesh with world-class prototyping laboratories, visionary governance, and dedicated seed funding.
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a href="#team" class="px-5 py-2.5 bg-brand-orange hover:bg-brand-accent text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center gap-2">
            <i data-lucide="users" class="w-4 h-4"></i>
            <span>Meet Leadership & Mentors</span>
          </a>
          <a href="#foundation" class="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-sm transition border border-white/30">
            <span>Our Foundation</span>
          </a>
        </div>
      </div>
    </div>
  </section>'''

if re.search(about_hero_old, about_c):
    about_c = re.sub(about_hero_old, about_hero_new, about_c, count=1)
    print("Updated about.html hero banner.")

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(about_c)
print("Saved merged about.html successfully!")
