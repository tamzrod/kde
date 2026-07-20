# ForgeSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.972090Z
**Run ID**: RUN-044
**Seed**: 1700000044

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: hash_chain
- Commit Method: quorum_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: crash_stop

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 377ms
- Election Timeout Base: 473ms
- Election Timeout Range: 131ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- voting:flexible_quorum
- vote_granting:grant_based_on_priority
- log:hybrid
- log_structure:hash_chain
- commit:quorum_commit
- recovery:snapshot_transfer
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 48
- Elections Succeeded: 35
- Election Success Rate: 72.92%
- Messages Sent: 144
- Commits: 15
- Avg Messages/Commit: 9.60
- Leader Changes: 35
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 49
- Elections Succeeded: 44
- Election Success Rate: 89.80%
- Messages Sent: 254
- Commits: 12
- Avg Messages/Commit: 21.17
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 50
- Elections Succeeded: 50
- Election Success Rate: 100.00%
- Messages Sent: 500
- Commits: 15
- Avg Messages/Commit: 33.33
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 60
- Elections Succeeded: 51
- Election Success Rate: 85.00%
- Messages Sent: 552
- Commits: 33
- Avg Messages/Commit: 16.73
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

