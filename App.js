
import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from "@expo-google-fonts/nunito";

const { width: SW, height: SH } = Dimensions.get("window");

// ─── RARIDADES ───────────────────────────────────────────────────────────────
const RARITIES = {
  comum:    { label: "Comum",    weight: 40, color: "#909090", bg: "#F5F5F5", border: "#C8C8C8", text: "#555555", icon: "⬜" },
  incomum:  { label: "Incomum",  weight: 28, color: "#3DAA3D", bg: "#F0FFF0", border: "#7BC87B", text: "#276227", icon: "🟩" },
  raro:     { label: "Raro",     weight: 18, color: "#3B82F6", bg: "#EFF6FF", border: "#93C5FD", text: "#1D4ED8", icon: "🟦" },
  epico:    { label: "Épico",    weight: 10, color: "#9333EA", bg: "#FAF5FF", border: "#C084FC", text: "#7E22CE", icon: "🟪" },
  lendario: { label: "Lendário", weight:  4, color: "#F59E0B", bg: "#FFFBEB", border: "#FCD34D", text: "#92400E", icon: "🟨" },
  secreto:  { label: "Secreto",  weight:  0, color: "#A855F7", bg: "#0D0020", border: "#A855F7", text: "#F0D0FF", icon: "🌸" },
};

const SECRET_CHANCE = 1 / 80;

// ─── JOGOS ───────────────────────────────────────────────────────────────────
const GAMES = [
  // COMUM
  { name: "Work at a Pizza Place",     emoji: "🍕", desc: "clássico do roblox",     rarity: "comum" },
  { name: "Clicker Simulator",         emoji: "👆", desc: "clica sem parar",         rarity: "comum" },
  { name: "Obby But You're On a Bike", emoji: "🚲", desc: "obby caótico",            rarity: "comum" },
  { name: "Bathroom Tower Defense",    emoji: "🚽", desc: "tower defense estranhão", rarity: "comum" },
  { name: "Super Golf",                emoji: "⛳", desc: "golf maluco",              rarity: "comum" },
  { name: "Scary Elevator",            emoji: "🛗", desc: "andares aterrorizantes",  rarity: "comum" },
  { name: "Natural Disaster",          emoji: "🌪️", desc: "sobreviva ao caos",      rarity: "comum" },
  { name: "Roblox BrainRot",           emoji: "🧠", desc: "memes e caos",            rarity: "comum" },
  // INCOMUM
  { name: "Brookhaven",                emoji: "🏡", desc: "roleplay e drama",        rarity: "incomum" },
  { name: "Adopt Me!",                 emoji: "🐶", desc: "pets fofos",              rarity: "incomum" },
  { name: "Livetopia",                 emoji: "🏘️", desc: "roleplay de cidade",     rarity: "incomum" },
  { name: "Dress to Impress",          emoji: "👗", desc: "moda e estilo",           rarity: "incomum" },
  { name: "Starving Artists",          emoji: "🎨", desc: "crie e venda arte",       rarity: "incomum" },
  { name: "Pet Simulator X",           emoji: "🐱", desc: "colecionando pets",       rarity: "incomum" },
  { name: "Funky Friday",              emoji: "🎵", desc: "ritmo e música",           rarity: "incomum" },
  { name: "Fisch",                     emoji: "🎣", desc: "pescaria relaxante",      rarity: "incomum" },
  // RARO
  { name: "Jailbreak",                 emoji: "🚔", desc: "fuja da prisão",          rarity: "raro" },
  { name: "Bedwars",                   emoji: "🛏️", desc: "proteja sua cama",       rarity: "raro" },
  { name: "Arsenal",                   emoji: "🔫", desc: "shooter frenético",       rarity: "raro" },
  { name: "Murder Mystery 2",          emoji: "🔪", desc: "quem é o assassino?",     rarity: "raro" },
  { name: "Flee the Facility",         emoji: "🏃", desc: "fuja do hacker",          rarity: "raro" },
  { name: "Piggy",                     emoji: "🐷", desc: "fuja do monstro",         rarity: "raro" },
  { name: "Slap Battles",              emoji: "👋", desc: "batalha de tapas",         rarity: "raro" },
  { name: "Da Hood",                   emoji: "🏙️", desc: "caos urbano",            rarity: "raro" },
  // ÉPICO
  { name: "Blox Fruits",               emoji: "⚔️", desc: "batalha e poderes",      rarity: "epico" },
  { name: "Tower of Hell",             emoji: "🗼", desc: "obstáculos insanos",      rarity: "epico" },
  { name: "Anime Adventures",          emoji: "✨", desc: "tower defense anime",      rarity: "epico" },
  { name: "Shindo Life",               emoji: "🌀", desc: "estilo naruto",            rarity: "epico" },
  { name: "Strongest Battlegrounds",   emoji: "💥", desc: "batalha épica anime",     rarity: "epico" },
  { name: "Sky",                       emoji: "☁️", desc: "aventura nas nuvens",    rarity: "epico" },
  // LENDÁRIO
  { name: "Royale High",               emoji: "👑", desc: "escola de princesas",     rarity: "lendario" },
  { name: "Doors",                     emoji: "🚪", desc: "terror + puzzle",         rarity: "lendario" },
  { name: "Deepwoken",                 emoji: "🌊", desc: "rpg hardcore",            rarity: "lendario" },
  { name: "The Mimic",                 emoji: "👹", desc: "horror japonês",           rarity: "lendario" },
  { name: "Sol's RNG",                 emoji: "🎲", desc: "sorte e raridades",       rarity: "lendario" },
  // SECRETO
  { name: "Área de Feitiços",          emoji: "🔮", desc: "magia e feitiçaria!",     rarity: "secreto" },
];

// ─── WEIGHTED ROLL ────────────────────────────────────────────────────────────
function rollGame() {
  if (Math.random() < SECRET_CHANCE) {
    return GAMES.find((g) => g.rarity === "secreto");
  }
  const pool = GAMES.filter((g) => g.rarity !== "secreto");
  const total = pool.reduce((s, g) => s + RARITIES[g.rarity].weight, 0);
  let r = Math.random() * total;
  for (const g of pool) {
    r -= RARITIES[g.rarity].weight;
    if (r <= 0) return g;
  }
  return pool[pool.length - 1];
}

// ─── KITTY PARTICLE ───────────────────────────────────────────────────────────
const KITTIES = ["🐱","😺","😸","🐾","🐈","😻","🙀","😹"];

function KittyParticle({ onDone }) {
  const translateY = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const left = useRef(Math.random() * (SW - 40)).current;
  const size = useRef(16 + Math.random() * 18).current;
  const emoji = useRef(KITTIES[Math.floor(Math.random() * KITTIES.length)]).current;
  const dur = useRef(1800 + Math.random() * 1400).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: SH + 60, duration: dur, useNativeDriver: true }),
      Animated.timing(opacity,    { toValue: 0,       duration: dur, useNativeDriver: true }),
      Animated.timing(rotate,     { toValue: 1,       duration: dur, useNativeDriver: true }),
    ]).start(onDone);
  }, []);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "720deg"] });

  return (
    <Animated.Text
      style={{
        position: "absolute",
        top: 0,
        left,
        fontSize: size,
        transform: [{ translateY }, { rotate: spin }],
        opacity,
        zIndex: 999,
      }}
    >
      {emoji}
    </Animated.Text>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black });

  const [current, setCurrent]       = useState(null);
  const [history, setHistory]       = useState([]);
  const [kitties, setKitties]       = useState([]);
  const [spinning, setSpinning]     = useState(false);
  const [showCard, setShowCard]     = useState(false);

  // Card animations
  const cardScale   = useRef(new Animated.Value(0.5)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardRotate  = useRef(new Animated.Value(-5)).current;
  const floatAnim   = useRef(new Animated.Value(0)).current;
  const floatLoop   = useRef(null);
  const kittyId     = useRef(0);

  // Button pulse
  const btnScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(btnScale, { toValue: 1.07, duration: 600, useNativeDriver: true }),
        Animated.timing(btnScale, { toValue: 1,    duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const popCard = useCallback(() => {
    cardScale.setValue(0.5);
    cardOpacity.setValue(0);
    cardRotate.setValue(-5);
    floatAnim.setValue(0);
    if (floatLoop.current) floatLoop.current.stop();

    Animated.parallel([
      Animated.spring(cardScale,   { toValue: 1,  friction: 5, tension: 100, useNativeDriver: true }),
      Animated.timing(cardOpacity, { toValue: 1,  duration: 200, useNativeDriver: true }),
      Animated.spring(cardRotate,  { toValue: 0,  friction: 6, useNativeDriver: true }),
    ]).start(() => {
      floatLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -10, duration: 1500, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue:   0, duration: 1500, useNativeDriver: true }),
        ])
      );
      floatLoop.current.start();
    });
  }, [cardScale, cardOpacity, cardRotate, floatAnim]);

  const spawnKitties = useCallback((count = 20) => {
    const newOnes = Array.from({ length: count }, () => kittyId.current++);
    setKitties(prev => [...prev, ...newOnes]);
  }, []);

  const removeKitty = useCallback((id) => {
    setKitties(prev => prev.filter(k => k !== id));
  }, []);

  const sortear = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setShowCard(true);
    if (floatLoop.current) floatLoop.current.stop();

    const pool = GAMES.filter(g => g.rarity !== "secreto");
    let count = 0;
    const total = 14;

    const tick = () => {
      if (count >= total) {
        const final = rollGame();
        setCurrent(final);
        setHistory(prev => [{ emoji: final.emoji, rarity: final.rarity }, ...prev].slice(0, 6));
        setSpinning(false);
        popCard();
        spawnKitties(["epico","lendario","secreto"].includes(final.rarity) ? 36 : 20);
        return;
      }
      setCurrent(pool[Math.floor(Math.random() * pool.length)]);
      count++;
      setTimeout(tick, 55 + count * 8);
    };
    tick();
  }, [spinning, popCard, spawnKitties]);

  if (!fontsLoaded) return null;

  const rar = current ? RARITIES[current.rarity] : null;
  const isSecret = current?.rarity === "secreto";
  const cardRotateDeg = cardRotate.interpolate({ inputRange: [-5, 5], outputRange: ["-5deg", "5deg"] });

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF0F5" />

      {/* Kitty confetti */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {kitties.map(id => <KittyParticle key={id} onDone={() => removeKitty(id)} />)}
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.subLabel}>APP DA</Text>
          <LinearGradient colors={["#FF6EB4","#C86DD8","#7B9FFF"]} start={{x:0,y:0}} end={{x:1,y:0}} style={s.titleGrad}>
            <Text style={s.title}>Mai's Roblox Picker 🌸</Text>
          </LinearGradient>
          <Text style={s.tagline}>o que jogar hoje?</Text>
          <Text style={s.decoStars}>✦ ✧ ✦ ✧ ✦</Text>
        </View>

        {/* Legenda de raridades */}
        <View style={s.legend}>
          {Object.entries(RARITIES).map(([key, r]) => (
            <View key={key} style={[s.pill, { backgroundColor: r.bg, borderColor: r.border }]}>
              <Text style={[s.pillText, { color: r.text }]}>{r.icon} {r.label}</Text>
            </View>
          ))}
        </View>

        {/* Card */}
        <View style={s.cardArea}>
          {!showCard ? (
            <View style={s.placeholder}>
              <Text style={s.placeholderText}>toca no botão! 🐾</Text>
            </View>
          ) : (
            <Animated.View style={[
              s.cardOuter,
              {
                transform: [{ scale: cardScale }, { rotate: cardRotateDeg }, { translateY: floatAnim }],
                opacity: cardOpacity,
              }
            ]}>
              {isSecret ? (
                <LinearGradient colors={["#0D0020","#1E0040","#0D0020"]} style={[s.card, { borderColor: rar?.border, borderWidth: 2.5 }]}>
                  <Text style={s.gameEmoji}>{current?.emoji}</Text>
                  <Text style={[s.gameName, { color: "#F0D0FF" }]}>{current?.name}</Text>
                  <View style={[s.descPill, { backgroundColor: "rgba(168,85,247,0.2)" }]}>
                    <Text style={[s.descText, { color: rar?.text }]}>{current?.desc}</Text>
                  </View>
                  {!spinning && (
                    <View style={[s.rarityBadge, { backgroundColor: "#7C3AED", borderColor: "#A855F7" }]}>
                      <Text style={[s.rarityBadgeText, { color: "white" }]}>{rar?.icon} {rar?.label}</Text>
                    </View>
                  )}
                </LinearGradient>
              ) : (
                <View style={[s.card, { backgroundColor: "white", borderColor: rar?.border, borderWidth: 2.5 }]}>
                  <Text style={s.gameEmoji}>{current?.emoji}</Text>
                  <Text style={[s.gameName, { color: "#2D1832" }]}>{current?.name}</Text>
                  <View style={[s.descPill, { backgroundColor: rar?.bg }]}>
                    <Text style={[s.descText, { color: rar?.text }]}>{current?.desc}</Text>
                  </View>
                  {!spinning && (
                    <View style={[s.rarityBadge, { backgroundColor: rar?.bg, borderColor: rar?.border }]}>
                      <Text style={[s.rarityBadgeText, { color: rar?.text }]}>{rar?.icon} {rar?.label}</Text>
                    </View>
                  )}
                </View>
              )}
            </Animated.View>
          )}
        </View>

        {/* Botão */}
        <Animated.View style={{ transform: [{ scale: spinning ? 1 : btnScale }] }}>
          <TouchableOpacity onPress={sortear} disabled={spinning} activeOpacity={0.85}>
            <LinearGradient colors={["#FF6EB4","#D96DD8"]} start={{x:0,y:0}} end={{x:1,y:1}} style={[s.btn, spinning && s.btnDisabled]}>
              <Text style={s.btnText}>{spinning ? "sorteando..." : "Escolher jogo 🎮"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Histórico */}
        {history.length > 0 && (
          <View style={s.historySection}>
            <Text style={s.historyLabel}>ÚLTIMOS SORTEADOS</Text>
            <View style={s.historyRow}>
              {history.map((h, i) => (
                <View key={i} style={[s.historyChip, { backgroundColor: RARITIES[h.rarity].bg, borderColor: RARITIES[h.rarity].border }]}>
                  <Text style={{ fontSize: 20 }}>{h.emoji}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={s.counter}>{history.length} {history.length === 1 ? "jogo sorteado" : "jogos sorteados"} 🎀</Text>

        {/* Tabela de chances */}
        <View style={s.oddsBox}>
          <Text style={s.oddsTitle}>✦ CHANCES DE RARIDADE ✦</Text>
          {[
            { key:"comum",    pct:"~40%",  fill:0.40 },
            { key:"incomum",  pct:"~28%",  fill:0.28 },
            { key:"raro",     pct:"~18%",  fill:0.18 },
            { key:"epico",    pct:"~10%",  fill:0.10 },
            { key:"lendario", pct:"~4%",   fill:0.04 },
            { key:"secreto",  pct:"1.25%", fill:0.0125 },
          ].map(({ key, pct, fill }) => {
            const r = RARITIES[key];
            return (
              <View key={key} style={s.oddsRow}>
                <Text style={[s.oddsName, { color: r.text }]}>{r.icon} {r.label}</Text>
                <View style={s.oddsTrack}>
                  <View style={[s.oddsFill, { width: `${fill * 100}%`, backgroundColor: r.color }]} />
                </View>
                <Text style={[s.oddsPct, { color: r.text }]}>{pct}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  scroll: {
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Header
  header:    { alignItems: "center", marginBottom: 20 },
  subLabel:  { fontSize: 11, fontFamily: "Nunito_800ExtraBold", letterSpacing: 3, color: "#D4669A", marginBottom: 6 },
  titleGrad: { borderRadius: 8, paddingHorizontal: 4 },
  title:     { fontSize: 28, fontFamily: "Nunito_900Black", color: "white", textAlign: "center" },
  tagline:   { fontSize: 13, fontFamily: "Nunito_700Bold", color: "#B07090", marginTop: 6 },
  decoStars: { fontSize: 14, color: "#FFAACC", marginTop: 8, letterSpacing: 6 },

  // Legend
  legend:   { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 18, maxWidth: 340 },
  pill:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1.5 },
  pillText: { fontSize: 10, fontFamily: "Nunito_800ExtraBold", letterSpacing: 0.5 },

  // Card area
  cardArea: { width: "100%", maxWidth: 320, minHeight: 200, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  placeholder: { width: "100%", borderWidth: 2.5, borderColor: "#F0B0D0", borderStyle: "dashed", borderRadius: 28, padding: 40, alignItems: "center" },
  placeholderText: { fontSize: 14, fontFamily: "Nunito_700Bold", color: "#D4A0BC" },

  cardOuter: { width: "100%", maxWidth: 320 },
  card: { borderRadius: 28, paddingVertical: 28, paddingHorizontal: 24, alignItems: "center" },
  gameEmoji: { fontSize: 54, marginBottom: 10 },
  gameName:  { fontSize: 22, fontFamily: "Nunito_900Black", marginBottom: 8, textAlign: "center" },
  descPill:  { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20, marginBottom: 4 },
  descText:  { fontSize: 12, fontFamily: "Nunito_700Bold" },
  rarityBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20, borderWidth: 1.5, marginTop: 10 },
  rarityBadgeText: { fontSize: 11, fontFamily: "Nunito_800ExtraBold", letterSpacing: 0.8, textTransform: "uppercase" },

  // Button
  btn:         { borderRadius: 50, paddingVertical: 17, paddingHorizontal: 44, elevation: 8, shadowColor: "#FF6EB4", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12 },
  btnDisabled: { opacity: 0.7 },
  btnText:     { fontSize: 18, fontFamily: "Nunito_900Black", color: "white", textAlign: "center", letterSpacing: 0.3 },

  // History
  historySection: { alignItems: "center", marginTop: 20, marginBottom: 4 },
  historyLabel:   { fontSize: 11, fontFamily: "Nunito_800ExtraBold", color: "#C090B0", letterSpacing: 2, marginBottom: 8 },
  historyRow:     { flexDirection: "row", gap: 6, flexWrap: "wrap", justifyContent: "center" },
  historyChip:    { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 2 },

  counter: { fontSize: 12, fontFamily: "Nunito_700Bold", color: "#C0A0B8", marginTop: 8, marginBottom: 16 },

  // Odds
  oddsBox:   { width: "100%", maxWidth: 320, backgroundColor: "white", borderRadius: 18, padding: 16, borderWidth: 1.5, borderColor: "#FFCCE8", elevation: 3, shadowColor: "#FF6EB4", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6 },
  oddsTitle: { fontSize: 10, fontFamily: "Nunito_800ExtraBold", letterSpacing: 2, color: "#C090B0", textAlign: "center", marginBottom: 10 },
  oddsRow:   { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  oddsName:  { fontSize: 11, fontFamily: "Nunito_700Bold", width: 72 },
  oddsTrack: { flex: 1, height: 7, borderRadius: 10, backgroundColor: "#F0E8F4", overflow: "hidden" },
  oddsFill:  { height: "100%", borderRadius: 10 },
  oddsPct:   { fontSize: 10, fontFamily: "Nunito_800ExtraBold", width: 42, textAlign: "right" },
});
