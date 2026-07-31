# AnchorProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:44.710494Z
**Run ID**: RUN-001
**Seed**: 1700000001

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: append_only_array
- Commit Method: majority_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: leader_change

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: omission

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 407ms
- Election Timeout Base: 203ms
- Election Timeout Range: 248ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- log:value_log
- log_structure:append_only_array
- commit:majority_commit
- recovery:hybrid_recovery
- snapshot:leader_change
- dynamic_membership:add_node
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 57
- Elections Succeeded: 55
- Election Success Rate: 96.49%
- Messages Sent: 230
- Commits: 23
- Avg Messages/Commit: 10.00
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 45
- Elections Succeeded: 37
- Election Success Rate: 82.22%
- Messages Sent: 270
- Commits: 16
- Avg Messages/Commit: 16.88
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 45
- Elections Succeeded: 45
- Election Success Rate: 100.00%
- Messages Sent: 511
- Commits: 26
- Avg Messages/Commit: 19.65
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 62
- Elections Succeeded: 58
- Election Success Rate: 93.55%
- Messages Sent: 605
- Commits: 28
- Avg Messages/Commit: 21.61
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

