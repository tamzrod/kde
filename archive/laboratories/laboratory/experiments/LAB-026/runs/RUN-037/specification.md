# ForgeProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.595307Z
**Run ID**: RUN-037
**Seed**: 1700000037

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: write_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: append_only_array
- Commit Method: majority_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: crash_stop

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 296ms
- Election Timeout Base: 308ms
- Election Timeout Range: 70ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:write_quorum
- vote_granting:grant_based_on_priority
- log:state_machine
- log_structure:append_only_array
- commit:majority_commit
- recovery:snapshot_transfer
- snapshot:adaptive
- dynamic_membership:joint_consensus
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 66
- Elections Succeeded: 42
- Election Success Rate: 63.64%
- Messages Sent: 166
- Commits: 17
- Avg Messages/Commit: 9.76
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 59
- Elections Succeeded: 56
- Election Success Rate: 94.92%
- Messages Sent: 327
- Commits: 17
- Avg Messages/Commit: 19.24
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 54
- Election Success Rate: 91.53%
- Messages Sent: 457
- Commits: 26
- Avg Messages/Commit: 17.58
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 50
- Election Success Rate: 87.72%
- Messages Sent: 325
- Commits: 17
- Avg Messages/Commit: 19.12
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

