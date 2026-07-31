# SignalUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.080435Z
**Run ID**: RUN-046
**Seed**: 1700000046

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: id_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: hash_chain
- Commit Method: batch_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: periodic

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: omission

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 397ms
- Election Timeout Base: 384ms
- Election Timeout Range: 224ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:id_based
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_if_log_newer
- log:state_machine
- log_structure:hash_chain
- commit:batch_commit
- recovery:incremental_snapshot
- snapshot:periodic
- dynamic_membership:full_dynamic
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 61
- Elections Succeeded: 43
- Election Success Rate: 70.49%
- Messages Sent: 173
- Commits: 20
- Avg Messages/Commit: 8.65
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 55
- Election Success Rate: 98.21%
- Messages Sent: 349
- Commits: 24
- Avg Messages/Commit: 14.54
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 63
- Elections Succeeded: 49
- Election Success Rate: 77.78%
- Messages Sent: 320
- Commits: 20
- Avg Messages/Commit: 16.00
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 44
- Elections Succeeded: 44
- Election Success Rate: 100.00%
- Messages Sent: 554
- Commits: 26
- Avg Messages/Commit: 21.31
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

