# Testing Strategy Matrix for Industrial Automation

**Evidence ID**: EVID-LAB066-003
**Experiment**: LAB-066
**created**: 2026-07-29T06:11:30Z
**Type**: TEST_SPECIFICATION

---

## 1. Testing Pyramid

```
                          ▲
                         ╱ ╲
                        ╱   ╲    HIL (Hardware-in-the-Loop)
                       ╱     ╲   Coverage: 80% of safety functions
                      ╱───────╲  Frequency: Major releases
                     ╱         ╲
                    ╱   SIL     ╲  SIL (Software-in-the-Loop)
                   ╱             ╲ Coverage: 95% of logic
                  ╱───────────────╲Frequency: Every release
                 ╱                  ╲
                ╱    Integration     ╲
               ╱                      ╲ Coverage: 90% of interfaces
              ╱────────────────────────╲Frequency: Every PR
             ╱         Unit              ╲
            ╱           Tests              ╲Coverage: 95% of code
           ╱────────────────────────────────╲Frequency: Every commit
```

---

## 2. Test Level Specifications

### 2.1 Unit Tests (Level 1)

| Attribute | Specification |
|-----------|---------------|
| Scope | Individual Function Blocks, Programs |
| Environment | PLC Simulator / IDE debugger |
| Execution Time | < 1 minute per FB |
| Isolation | No external dependencies |
| Coverage Target | 95% |

**Test Categories**:

| Category | Description | Example |
|----------|-------------|---------|
| Logic Tests | Boolean logic validation | AND, OR, NOT operations |
| Math Tests | Arithmetic operations | ADD, SUB, MUL, DIV |
| Compare Tests | Comparison logic | GT, LT, EQ, NE |
| Timer Tests | Timing function validation | TON, TOF, TP |
| Counter Tests | Counting operations | CTU, CTD, CTUD |

### 2.2 Integration Tests (Level 2)

| Attribute | Specification |
|-----------|---------------|
| Scope | Multi-FB, Program interfaces |
| Environment | SIL (Virtual PLC) |
| Execution Time | < 5 minutes per suite |
| Dependencies | External I/O mocked |
| Coverage Target | 90% |

**Test Categories**:

| Category | Description | Example |
|----------|-------------|---------|
| Tag Tests | I/O tag mapping | Physical I/O ↔ PLC tags |
| Alarm Tests | Alarm sequence logic | Trigger → Annunciation → Ack |
| Mode Tests | Operation mode changes | Manual → Auto → Remote |
| Recipe Tests | Parameter set switching | Recipe A → Recipe B |

### 2.3 SIL Tests (Level 3)

| Attribute | Specification |
|-----------|---------------|
| Scope | Complete PLC project |
| Environment | Virtual PLC (Production PLC model) |
| Execution Time | < 30 minutes |
| Hardware | Virtualized |
| Coverage Target | 100% of logic |

**Test Categories**:

| Category | Description | Example |
|----------|-------------|---------|
| Functional Tests | End-to-end scenarios | Start sequence, stop sequence |
| Safety Tests | Safety function validation | E-Stop, Safety zones |
| Performance Tests | Cycle time, memory | < 100ms cycle, < 80% RAM |
| Communication Tests | OPC UA, Profinet | Read/Write cycles |

### 2.4 HIL Tests (Level 4)

| Attribute | Specification |
|-----------|---------------|
| Scope | Production configuration |
| Environment | Real PLC + Physical I/O |
| Execution Time | < 2 hours |
| Hardware | Development PLC rig |
| Coverage Target | Safety functions |

**Test Categories**:

| Category | Description | Example |
|----------|-------------|---------|
| I/O Tests | Physical input/output | DI/DO/AI/AO validation |
| Safety Tests | Safety PLC integration | Safety zone breaches |
| HMI Tests | Operator interface | Screen navigation, commands |
| Emergency Tests | Emergency procedures | E-Stop response, alarm handling |

---

## 3. Test Matrix

| Test ID | Name | Level | Duration | Pass Criteria | Auto | Safety |
|---------|------|-------|----------|---------------|------|--------|
| UT-001 | FB Logic - Motor Control | UNIT | 30s | 100% | YES | NO |
| UT-002 | FB Logic - Valve Control | UNIT | 30s | 100% | YES | NO |
| UT-003 | FB Math - PID Controller | UNIT | 45s | 100% | YES | NO |
| UT-004 | FB Timer - Sequence Timer | UNIT | 30s | 100% | YES | NO |
| UT-005 | FB Counter - Batch Counter | UNIT | 30s | 100% | YES | NO |
| IT-001 | Tag Mapping - Digital I/O | INTEGRATION | 2m | 100% | YES | NO |
| IT-002 | Tag Mapping - Analog I/O | INTEGRATION | 3m | 100% | YES | NO |
| IT-003 | Alarm Sequence - Warning | INTEGRATION | 2m | 100% | YES | NO |
| IT-004 | Alarm Sequence - Fault | INTEGRATION | 2m | 100% | YES | YES |
| IT-005 | Mode Transition - Auto | INTEGRATION | 2m | 100% | YES | NO |
| IT-006 | Recipe Load - Standard | INTEGRATION | 5m | 100% | YES | NO |
| SIL-001 | Start Sequence - Full | SIL | 10m | 100% | YES | NO |
| SIL-002 | Stop Sequence - Normal | SIL | 5m | 100% | YES | NO |
| SIL-003 | Stop Sequence - Emergency | SIL | 5m | 100% | YES | YES |
| SIL-004 | Safety Zone - Entry | SIL | 5m | 100% | YES | YES |
| SIL-005 | Safety Zone - Breach | SIL | 5m | 100% | YES | YES |
| SIL-006 | Cycle Time - Normal | SIL | 15m | < 100ms | YES | NO |
| SIL-007 | Memory Usage | SIL | 5m | < 80% | YES | NO |
| SIL-008 | Communication - OPC UA | SIL | 5m | 100% | YES | NO |
| HIL-001 | Physical DI - All Channels | HIL | 30m | 100% | PARTIAL | NO |
| HIL-002 | Physical DO - All Channels | HIL | 30m | 100% | PARTIAL | NO |
| HIL-003 | Physical AI - All Channels | HIL | 30m | 100% | PARTIAL | NO |
| HIL-004 | Physical AO - All Channels | HIL | 30m | 100% | PARTIAL | NO |
| HIL-005 | E-Stop Response | HIL | 15m | < 100ms | PARTIAL | YES |
| HIL-006 | Safety Zone - Physical | HIL | 20m | 100% | PARTIAL | YES |
| HIL-007 | HMI - Command Execution | HIL | 20m | 100% | PARTIAL | NO |
| HIL-008 | Failover - Controller Swap | HIL | 30m | Recovery < 30s | PARTIAL | YES |

---

## 4. Test Framework Implementation

### 4.1 Unit Test Framework

```structured-text
// Example: Motor Control FB Unit Test
FUNCTION_BLOCK Test_MotorControl
VAR_INPUT
    StartSignal: BOOL;
    StopSignal: BOOL;
    FaultSignal: BOOL;
END_VAR
VAR_OUTPUT
    MotorRunning: BOOL;
    StatusWord: WORD;
END_VAR

TEST('Motor starts on start signal')
    StartSignal := TRUE;
    StopSignal := FALSE;
    FaultSignal := FALSE;
    Execute();
    Assert(MotorRunning = TRUE);
END_TEST

TEST('Motor stops on stop signal')
    StartSignal := FALSE;
    StopSignal := TRUE;
    Execute();
    Assert(MotorRunning = FALSE);
END_TEST

TEST('Motor trips on fault')
    StartSignal := TRUE;
    FaultSignal := TRUE;
    Execute();
    Assert(MotorRunning = FALSE);
    Assert(StatusWord.0 = TRUE); // Fault bit
END_TEST
```

### 4.2 Integration Test Specification

```yaml
integration_tests:
  name: "IEC61131_Integration_Suite"
  version: "1.0"
  
  test_cases:
    - id: "IT-001"
      name: "Digital Input Mapping"
      type: "tag_validation"
      
      setup:
        - set_tag("DI_Start_PB", TRUE)
        - wait(100ms)
        
      verify:
        - assert_tag("PLC_Start", TRUE)
        - assert_tag("Start_Ack", TRUE)
        
      teardown:
        - reset_all_tags()
        
    - id: "IT-004"
      name: "Alarm Sequence - High Temperature"
      type: "sequence"
      safety_critical: true
      
      setup:
        - set_mode("AUTO")
        - reset_alarms()
        
      trigger:
        - set_tag("AI_Temperature", 85.0) # Above threshold
        
      verify:
        - assert_tag("Alarm_HighTemp", TRUE)
        - assert_tag("Alarm_Acknowledged", FALSE)
        - wait_for_tag("Alarm_Acknowledged", TRUE, timeout=30s)
        
      teardown:
        - set_tag("AI_Temperature", 50.0)
        - acknowledge_alarm()
```

### 4.3 HIL Test Specification

```yaml
hil_tests:
  name: "Hardware_Validation_Suite"
  environment: "HIL_RIG_001"
  
  hardware_config:
    plc_model: "S7-1500"
    firmware: "V2.8"
    io_modules:
      - "DI 32x24V"
      - "DO 32x24V" 
      - "AI 8xU/I"
      - "AO 4xU/I"
      
  safety_config:
    safety_plc: "F-I/O"
    e_stop_response_time: "< 10ms"
    
  test_cases:
    - id: "HIL-005"
      name: "E-Stop Response Time"
      type: "timing"
      safety_critical: true
      
      procedure:
        - state: "Normal Operation"
          motor_running: TRUE
          
        - action: "Trigger E-Stop"
          set_e_stop(TRUE)
          
        - measure: "Response Time"
          start_timer()
          wait_for_output("DO_Motor_Enable", FALSE)
          stop_timer()
          
        - assert: "Response < 100ms"
          response_time < 100
```

---

## 5. Test Execution Schedule

| Trigger | Unit | Integration | SIL | HIL |
|---------|------|------------|-----|-----|
| Every Commit | ✅ | ❌ | ❌ | ❌ |
| Every PR | ✅ | ✅ | ❌ | ❌ |
| Every Release | ✅ | ✅ | ✅ | ❌ |
| Major Release | ✅ | ✅ | ✅ | ✅ |
| Quarterly | ✅ | ✅ | ✅ | ✅ |

---

## 6. Test Reporting

### 6.1 Metrics Dashboard

| Metric | Formula | Target |
|--------|---------|--------|
| Pass Rate | Passed / Total × 100 | > 98% |
| Coverage | Covered / Total × 100 | > 90% |
| MTTD | Mean Time To Detect (hours) | < 4h |
| MTTR | Mean Time To Repair (hours) | < 24h |
| Test Cycle Time | End - Start | < target |

### 6.2 Defect Classification

| Severity | Definition | Response Time |
|----------|------------|---------------|
| CRITICAL | Safety function failure | Immediate |
| HIGH | Core functionality broken | < 4 hours |
| MEDIUM | Non-critical feature broken | < 24 hours |
| LOW | Minor issue, workaround exists | < 1 week |
| INFO | Cosmetic, documentation | < 1 month |

---

## 7. Continuous Improvement

### 7.1 Test Coverage Goals

```
Q1: 85% → Q2: 90% → Q3: 95% → Q4: 98%
```

### 7.2 Test Efficiency Metrics

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Test Execution Time | 45 min | 30 min | 33% reduction |
| Flaky Test Rate | 2% | < 0.5% | 75% reduction |
| Test Maintenance | 8h/week | 4h/week | 50% reduction |
