const CRISIS_PATTERNS = [
  /suicide|kill myself|end my life|want to die/i,
  /self\s*-?harm|cutting|cut myself/i,
  /hurt (someone|others)|harm (someone|others)/i
];

export function isCrisis(text){ return CRISIS_PATTERNS.some(r => r.test(text)); }

export function crisisAction(addMsg){
  addMsg('assistant', 'I’m really sorry you’re feeling this way. I can’t help with crises, but you’re not alone. Please consider contacting immediate support.');
  addMsg('assistant', '🇸🇬 SG: SOS 1767 (24/7), WhatsApp 9151 1767; mindline 1771; Emergencies: 995.\n🇺🇸 US: 988 Suicide & Crisis Lifeline.');
}