# ForgeCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.117656Z
**Run ID**: RUN-066
**Seed**: 1700000066

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: term_based
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: ring_buffer
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: log_compaction

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 64ms
- Election Timeout Base: 405ms
- Election Timeout Range: 145ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:lease_based_leadership
- voting:hierarchical_quorum
- vote_granting:grant_based_on_priority
- log:hybrid
- log_structure:ring_buffer
- commit:majority_commit
- recovery:log_catchup
- snapshot:log_compaction
- dynamic_membership:remove_node
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 45
- Elections Succeeded: 36
- Election Success Rate: 80.00%
- Messages Sent: 151
- Commits: 23
- Avg Messages/Commit: 6.57
- Leader Changes: 36
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 60
- Elections Succeeded: 54
- Election Success Rate: 90.00%
- Messages Sent: 329
- Commits: 27
- Avg Messages/Commit: 12.19
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 50
- Elections Succeeded: 49
- Election Success Rate: 98.00%
- Messages Sent: 462
- Commits: 18
- Avg Messages/Commit: 25.67
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 52
- Elections Succeeded: 50
- Election Success Rate: 96.15%
- Messages Sent: 495
- Commits: 20
- Avg Messages/Commit: 24.75
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

