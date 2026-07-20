# AetherCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.275361Z
**Run ID**: RUN-069
**Seed**: 1700000069

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: id_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: periodic

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 404ms
- Election Timeout Base: 156ms
- Election Timeout Range: 135ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:id_based
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_if_no_voted
- concept:majority_quorum
- log:state_machine
- log_structure:append_only_array
- commit:index_based
- recovery:snapshot_transfer
- snapshot:periodic
- dynamic_membership:single_config
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 53
- Elections Succeeded: 38
- Election Success Rate: 71.70%
- Messages Sent: 140
- Commits: 8
- Avg Messages/Commit: 17.50
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 47
- Elections Succeeded: 38
- Election Success Rate: 80.85%
- Messages Sent: 190
- Commits: 16
- Avg Messages/Commit: 11.88
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 55
- Election Success Rate: 100.00%
- Messages Sent: 555
- Commits: 25
- Avg Messages/Commit: 22.20
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 56
- Elections Succeeded: 56
- Election Success Rate: 100.00%
- Messages Sent: 646
- Commits: 19
- Avg Messages/Commit: 34.00
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

