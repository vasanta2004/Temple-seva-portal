import re
import os

filepath = r"c:\Users\VASANTA M\TEMPLE\frontend\src\pages\AdminDashboard.jsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace Blessing Flow Chart
old_blessing_flow = r"\{/\* Blessing Flow \(Chart\) \*/\}.*?\{/\* Devotee Engagement Progress matrix \*/\}"
new_blessing_flow = """{/* Blessing Flow (Chart) */}
                  <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl p-8 rounded-[2.5rem] border border-[var(--admin-border)] shadow-2xl relative overflow-hidden group hover:border-[var(--admin-border-focus)] transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-xl font-serif font-black text-[var(--admin-text)] italic">Blessing Flow</h3>
                        <p className={`text-[10px] ${currentTheme.accentText} font-black uppercase tracking-widest mt-1`}>Weekly Devotion Activity</p>
                      </div>
                      <div className={`p-2.5 rounded-full ${currentTheme.accentBg}`}>
                        <Sparkles className="text-secondary animate-pulse" size={16} />
                      </div>
                    </div>

                    <div className="h-44 flex items-end justify-between gap-2 px-2 relative">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="w-full h-px border-t border-dashed border-[var(--admin-text-muted)]" />
                        <div className="w-full h-px border-t border-dashed border-[var(--admin-text-muted)]" />
                        <div className="w-full h-px border-t border-dashed border-[var(--admin-text-muted)]" />
                        <div className="w-full h-px border-t border-[var(--admin-text-muted)]" />
                      </div>
                      
                      {[45, 68, 48, 88, 62, 80, 96].map((h, i) => (
                        <div key={i} className="flex-grow flex flex-col items-center group/bar relative z-10 cursor-pointer">
                          {/* Tooltip */}
                          <div className="absolute -top-10 opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all duration-300 bg-[var(--admin-text)] text-[var(--admin-bg)] text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl pointer-events-none z-50 whitespace-nowrap">
                            ₹{h}k
                          </div>
                          
                          {/* Bar Track */}
                          <div className="w-full max-w-[12px] sm:max-w-[16px] h-32 bg-[var(--admin-input-bg)] rounded-full relative overflow-hidden group-hover/bar:bg-[var(--admin-hover-bg)] transition-colors duration-300 shadow-inner">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${currentTheme.gradient} rounded-full transition-all duration-500`}
                            >
                              {/* Glowing top cap */}
                              <div className="absolute top-0 inset-x-0 h-3 bg-white/40 rounded-full blur-[2px]" />
                            </motion.div>
                          </div>
                          <span className="text-[9px] text-[var(--admin-text-muted)] mt-4 font-black uppercase tracking-wider group-hover/bar:text-[var(--admin-text)] group-hover/bar:scale-110 transition-all">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devotee Engagement Progress matrix */}"""

content = re.sub(old_blessing_flow, new_blessing_flow, content, flags=re.DOTALL)


# Replace Devotee Channels
old_channels = r"\{/\* Devotee Engagement Progress matrix \*/\}.*?\{/\* Sacred Ledger Table \*/\}"
new_channels = """{/* Devotee Engagement Progress matrix */}
                  <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl p-8 rounded-[2.5rem] border border-[var(--admin-border)] shadow-2xl group hover:border-[var(--admin-border-focus)] transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                    <div className="mb-8">
                      <h3 className="text-xl font-serif font-black text-[var(--admin-text)] italic">Devotee Channels</h3>
                      <p className={`text-[10px] ${currentTheme.accentText} font-black uppercase tracking-widest mt-1`}>System Gateway Interactions</p>
                    </div>
                    <div className="space-y-7">
                      {[
                        { label: 'Divine Mobile Portal', val: 72, color: currentTheme.gradient, icon: '📱' },
                        { label: 'Temple Web Sanctuary', val: 89, color: currentTheme.gradient, icon: '💻' },
                        { label: 'Holy Social Media Outreach', val: 54, color: 'from-gray-400 to-gray-500', icon: '🌐' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-3 group/progress cursor-pointer">
                          <div className="flex justify-between items-end">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm opacity-80 group-hover/progress:scale-110 transition-transform">{item.icon}</span>
                              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--admin-text-muted)] group-hover/progress:text-[var(--admin-text)] transition-colors">{item.label}</span>
                            </div>
                            <span className="text-xs font-black text-secondary group-hover/progress:scale-110 transition-transform">{item.val}%</span>
                          </div>
                          <div className="h-3.5 bg-[var(--admin-input-bg)] rounded-full overflow-hidden shadow-inner p-[2px]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.val}%` }}
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full relative shadow-sm`}
                            >
                              <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/progress:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sacred Ledger Table */}"""

content = re.sub(old_channels, new_channels, content, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Graphs updated.")
