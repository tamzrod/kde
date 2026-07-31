# PROGRAM.md - Zero-Knowledge Trading Strategy Discovery

**Program ID**: PROG-ZK-TRADING
**created**: 2026-07-24T15:18:25Z
**modified**: 2026-07-24T16:10:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Program Objective

Using only the acquired BTCUSDT 1-minute historical market data, discover whether repeatable market behaviors exist that could support the development of an original trading strategy.

**This is NOT about creating a profitable trading strategy.**

**This is about discovering behavioral mechanisms supported by evidence.**

---

## Knowledge Constraints

### PROHIBITED

- ❌ RSI
- ❌ MACD
- ❌ Bollinger Bands
- ❌ EMA/SMA crossover systems
- ❌ Elliott Wave
- ❌ Wyckoff
- ❌ ICT
- ❌ Smart Money Concepts
- ❌ Order Blocks
- ❌ Fair Value Gaps
- ❌ Fibonacci methods
- ❌ Market Profile
- ❌ Volume Profile
- ❌ Ichimoku
- ❌ Turtle Trading
- ❌ Any named or published trading methodology

### REQUIRED

- ✅ Use only the supplied BTCUSDT dataset
- ✅ Treat the market as an unknown dynamic system
- ✅ Discover behaviors without prior knowledge
- ✅ Form hypotheses from evidence only
- ✅ Falsify hypotheses through testing

---

## Program Workflow

### Investigation Runs

The runtime executes unlimited investigation runs. Each run has a unique objective:

| Run | Objective |
|-----|-----------|
| RUN-001 | Characterize the market structure |
| RUN-002 | Discover statistical behaviors |
| RUN-003 | Search for repeating temporal structures |
| RUN-004 | Investigate volatility transitions |
| RUN-005 | Investigate volume-price relationships |
| RUN-006 | Discover recurring state transitions |
| RUN-007 | Search for predictive sequences |
| RUN-008+ | Based on evidence from previous runs |

### Continuation Criteria

The program continues until:
- No additional evidence can be extracted
- Discovered mechanisms are falsified
- A defensible trading hypothesis emerges

---

## Mechanism Discovery

The runtime searches for:

- Recurring behaviors
- Recurring state changes
- Recurring sequences
- Recurring temporal structures
- Recurring volatility behavior
- Recurring liquidity behavior
- Recurring asymmetries
- Statistical persistence
- Hidden relationships
- Structural transitions

---

## Hypothesis Formation

### Requirements

A hypothesis may only be created when supported by multiple independent observations.

### Hypothesis Template

```
## Hypothesis H[N]

**Statement**: 

**Evidence**:

**Confidence**:

**Limitations**:

**Confounding Factors**:

**Falsification Experiments**:
```

---

## Trading Strategy Phase

### Precondition

A trading strategy SHALL NOT be designed until at least one behavioral mechanism survives repeated investigation.

### Strategy Requirements

If justified, the strategy must:
- Explain why it should work
- Identify supporting evidence
- Identify expected failure conditions
- Identify assumptions
- Identify uncertainty
- NOT reference known indicators or published methodologies

---

## Deliverables

| Document | Purpose |
|----------|---------|
| PROGRAM.md | This specification |
| RUN-001.md | Market characterization |
| RUN-002.md | Statistical behaviors |
| RUN-003.md | Temporal structures |
| RUN-004.md | Volatility transitions |
| RUN-005.md | Volume-price relationships |
| RUN-006.md | State transitions |
| RUN-007.md | Predictive sequences |
| FINDINGS.md | Summary of findings |
| HYPOTHESES.md | All hypotheses generated |
| MECHANISMS.md | Surviving mechanisms |
| STRATEGY.md | Original strategy (if justified) |
| REVIEW.md | Program review |
| NEXT-STEPS.md | Recommended future work |
| README.md | Program summary |

---

## Success Criteria

Success is NOT measured by profitability.

Success is measured by whether the runtime:

1. Discovered previously unknown behavioral mechanisms
2. Produced evidence supporting those mechanisms
3. Rejected unsupported hypotheses
4. Improved investigation methodology across successive runs
5. Produced an original evidence-derived trading hypothesis if justified

**The runtime shall prioritize scientific rigor over producing a trading strategy.**

---

## Data Source

**Dataset**: BTCUSDT 1-minute OHLCV
**Location**: `/workspace/project/kde/laboratory/investigations/INV-BINANCE-MARKET-DATA/data/btcusdt_1m.json`
**Records**: 11,000 candles
**Period**: 2026-07-17 to 2026-07-24

---

**Document Status**: ACTIVE
**Program Phase**: RUN-001 Preparation
