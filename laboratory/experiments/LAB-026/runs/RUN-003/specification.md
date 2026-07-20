# StratumPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:44.814433Z
**Run ID**: RUN-003
**Seed**: 1700000003

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: flexible_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: pipeline_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: log_compaction

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 351ms
- Election Timeout Base: 208ms
- Election Timeout Range: 298ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:lease_based_leadership
- voting:flexible_quorum
- vote_granting:grant_if_log_newer
- log:value_log
- log_structure:ring_buffer
- commit:pipeline_commit
- recovery:hybrid_recovery
- snapshot:log_compaction
- dynamic_membership:single_config
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 61
- Elections Succeeded: 49
- Election Success Rate: 80.33%
- Messages Sent: 209
- Commits: 16
- Avg Messages/Commit: 13.06
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 57
- Elections Succeeded: 40
- Election Success Rate: 70.18%
- Messages Sent: 210
- Commits: 23
- Avg Messages/Commit: 9.13
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 51
- Election Success Rate: 96.23%
- Messages Sent: 424
- Commits: 15
- Avg Messages/Commit: 28.27
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 69
- Elections Succeeded: 67
- Election Success Rate: 97.10%
- Messages Sent: 680
- Commits: 26
- Avg Messages/Commit: 26.15
- Leader Changes: 67
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

