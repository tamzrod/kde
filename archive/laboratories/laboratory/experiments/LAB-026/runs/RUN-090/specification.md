# AetherProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.370136Z
**Run ID**: RUN-090
**Seed**: 1700000090

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: tree_structure
- Commit Method: index_based

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: leader_change

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: byzantine

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 274ms
- Election Timeout Base: 244ms
- Election Timeout Range: 296ms

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

- leader_election:term_based
- concept:term_epochs
- voting:write_quorum
- vote_granting:grant_if_log_newer
- log:command_log
- log_structure:tree_structure
- commit:index_based
- recovery:hybrid_recovery
- snapshot:leader_change
- dynamic_membership:add_node
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 56
- Elections Succeeded: 47
- Election Success Rate: 83.93%
- Messages Sent: 198
- Commits: 15
- Avg Messages/Commit: 13.20
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 62
- Elections Succeeded: 49
- Election Success Rate: 79.03%
- Messages Sent: 257
- Commits: 14
- Avg Messages/Commit: 18.36
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 61
- Elections Succeeded: 57
- Election Success Rate: 93.44%
- Messages Sent: 528
- Commits: 23
- Avg Messages/Commit: 22.96
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 50
- Elections Succeeded: 50
- Election Success Rate: 100.00%
- Messages Sent: 590
- Commits: 33
- Avg Messages/Commit: 17.88
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

