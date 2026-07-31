# SPEC.md - LAB-CONTINUOUS-EVOLUTION-001

**Experiment ID**: LAB-CONTINUOUS-EVOLUTION-001
**Title**: Continuous Strategy Evolution, Temporal Validation & Scientific Trading Research
**created**: 2026-07-24T16:05:00Z
**modified**: 2026-07-24T16:05:00Z
**Status**: IN_PROGRESS
**Engine**: KDE-ENGINE-002 (Beta)

---

## Experiment Objective

Evaluate KDE as a continuously evolving market research system over a three-month historical simulation.

**This is NOT about maximizing profit.**

**This is about determining whether KDE can continuously:**

- Observe markets
- Discover mechanisms
- Discover strategies
- Execute previously discovered strategies
- Validate existing knowledge
- Reject false knowledge
- Allocate capital based on evidence
- Discover position sizing
- Continuously improve its knowledge ecosystem

**KDE should behave as a scientific researcher rather than a traditional trading bot.**

---

## Dataset Specification

| Parameter | Value |
|-----------|-------|
| **Market** | BTCUSDT |
| **Source** | Binance Historical 1-Minute Kline Data |
| **Simulation Start** | 2026-01-01 |
| **Simulation Duration** | ~6.5 months (Jan 1 - Jul 24, 2026) |
| **Total Records** | ~280,000 candles |
| **Approach** | Week-by-week simulation |

---

## Phase Structure

### Phase 1: Bootstrap Discovery (Week 1)

**Period**: January 1-7, 2026

| Activity | Status |
|----------|--------|
| Trading | DISABLED |
| Observation | ACTIVE |
| Mechanism Discovery | ACTIVE |
| Strategy Discovery | ACTIVE |
| Knowledge Building | ACTIVE |

**Output**: Generation 1 Knowledge Base

---

### Phase 2: Continuous Evolution (Weeks 2-28)

**Period**: January 8 - July 24, 2026

| Activity | Status |
|----------|--------|
| Trading | ENABLED |
| Observation | ACTIVE |
| Mechanism Discovery | ACTIVE |
| Strategy Discovery | ACTIVE |
| Learning | ACTIVE |
| Capital Allocation | ACTIVE |

---

## Knowledge Components

### Mechanisms

Each mechanism maintains:

```yaml
mechanism_id: M-XXX
name: <string>
discovery_date: <timestamp>
discovery_period: <date_range>
evidence:
  initial_trades: <count>
  initial_win_rate: <float>
  initial_mean_return: <float>
evolution:
  - date: <timestamp>
    trades: <count>
    win_rate: <float>
    confidence: <float>
    status: <active/dormant/retired>
```

### Strategies

Each strategy maintains:

```yaml
strategy_id: S-XXX
name: <string>
creation_date: <timestamp>
mechanisms: [<mechanism_ids>]
evidence:
  trades: <count>
  wins: <count>
  losses: <count>
  win_rate: <float>
  mean_return: <float>
  drawdown: <float>
grade:
  current: <float>
  history: [<grades>]
allocation:
  current: <float>
  history: [<allocations>]
position_sizing:
  method: <string>
  evidence: <string>
status: <active/dormant/retired>
```

---

## Position Sizing Methods

### Available Methods (Evidence-Supported Only)

1. **Evidence-Weighted Position Sizing (EWPS)**
   - Based on: Evidence quality, mechanism stability, regime certainty
   
2. **Confidence-Weighted Sizing**
   - Based on: Strategy confidence, mechanism confidence
   
3. **Stability-Weighted Sizing**
   - Based on: Historical consistency, regime compatibility

### Prohibited Methods (Unless Evidence Supports)

- ❌ Fixed percentage (without evidence)
- ❌ Kelly Criterion (without evidence)
- ❌ Martingale (without evidence)
- ❌ Anti-Martingale (without evidence)
- ❌ Risk parity (without evidence)

---

## Capital Allocation Rules

### Allocation Increases When:

- Evidence strengthens
- Mechanism confidence increases
- Strategy performs consistently
- Regime compatibility confirmed

### Allocation Decreases When:

- Evidence weakens
- Mechanism degrades
- Strategy underperforms
- Contradictory evidence emerges

### Allocation Zero When:

- Strategy retired
- Mechanism retired
- Evidence completely invalidated

---

## Trade Lifecycle

### Independent Hypotheses

Each trade tests FOUR independent hypotheses:

| Component | Hypothesis |
|-----------|-----------|
| Entry | Market conditions support entry |
| Stop Loss | Maximum acceptable loss defined |
| Take Profit | Target return defined |
| Position Size | Capital allocation justified |

### Trade Recording

```yaml
trade_id: T-XXX
timestamp: <datetime>
strategy_id: <string>
mechanism_ids: [<strings>]
entry_price: <float>
position_size: <float>
stop_loss: <float>
take_profit: <float>
exit_price: <float>
exit_reason: <string>
duration_minutes: <int>
pnl_percent: <float>
pnl_btc: <float>
regime_at_entry: <string>
confidence_at_entry: <float>
confidence_at_exit: <float>
```

---

## Reporting Schedule

### Daily Reports

**Format**: reports/daily/YYYY-MM-DD.md
**Content**:
- Trades executed
- Wins/Losses
- Win rate
- Net P&L
- Active strategies
- Capital allocation changes
- Mechanism changes

### Weekly Reports

**Format**: reports/weekly/WEEK-XX.md
**Content**:
- Weekly summary
- Strategy rankings
- Mechanism rankings
- Best/Worst performers
- Knowledge evolution

### Monthly Reports

**Format**: reports/monthly/MONTH-XX.md
**Content**:
- Monthly summary
- Strategy genealogy
- Mechanism evolution
- Capital allocation evolution

### Final Report

**Format**: FINAL-REPORT.md
**Content**:
- Complete portfolio analysis
- Knowledge evolution
- Scientific findings
- Recommendations

---

## Success Criteria

### Scientific Success (Primary)

| Metric | Target |
|--------|--------|
| Mechanisms Discovered | 10+ |
| Mechanisms Validated | 5+ |
| Mechanisms Rejected | 3+ |
| Strategies Created | 5+ |
| Strategies Improved | 3+ |
| Position Sizing Methods Discovered | 2+ |
| New Investigations Generated | 5+ |

### Trading Success (Secondary)

| Metric | Target |
|--------|--------|
| Win Rate | > 50% |
| Positive Expectancy | > 0 |
| Knowledge ROI | > 0 |

---

## Checkpoint System

### Auto-Save Points

| Checkpoint | Frequency | Content |
|------------|-----------|---------|
| Daily | End of each simulated day | Full state |
| Weekly | End of each simulated week | Summary + Full |
| Monthly | End of each simulated month | Comprehensive |

### Resumability

The experiment must be resumable from any checkpoint.

---

## Scientific Rules

### Conclusion Classification

Every conclusion MUST be explicitly classified as:

- **Observation**: Raw data fact
- **Statistical Evidence**: Calculated metric
- **Inference**: Interpretation based on evidence
- **Hypothesis**: Testable claim
- **Mechanism**: Validated behavioral pattern
- **Recommendation**: Action with evidence support

### Prohibited

- ❌ Speculation presented as evidence
- ❌ Recommendations without evidence
- ❌ Strategy optimization for historical returns
- ❌ Deletion of failed strategies/mechanisms

### Required

- ✅ All failures documented
- ✅ All successes documented
- ✅ Complete lineage tracking
- ✅ Continuous evidence classification

---

## Experiment Structure

```
LAB-CONTINUOUS-EVOLUTION-001/
├── SPEC.md
├── README.md
├── data/
│   ├── raw/
│   │   └── btcusdt_1m_*.json
│   └── processed/
├── knowledge/
│   ├── mechanisms/
│   └── relationships/
├── strategies/
├── mechanisms/
├── ledger/
│   └── trades.json
├── reports/
│   ├── daily/
│   ├── weekly/
│   ├── monthly/
│   └── FINAL-REPORT.md
└── checkpoints/
```

---

## Scope Notes

This experiment demonstrates continuous evolution principles using a scaled approach:

1. **Week-by-week simulation** instead of candle-by-candle
2. **Representative sampling** for demonstration
3. **Framework established** for full continuous operation
4. **Scientific rigor maintained** throughout

The architecture supports full 3-month continuous operation if desired.

---

**Document Status**: ACTIVE
**Experiment Phase**: Bootstrap Preparation
