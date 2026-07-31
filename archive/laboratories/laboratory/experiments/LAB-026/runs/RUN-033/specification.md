# BeaconPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.387026Z
**Run ID**: RUN-033
**Seed**: 1700000033

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: hash_chain
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: periodic

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 273ms
- Election Timeout Base: 378ms
- Election Timeout Range: 157ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:hierarchical_quorum
- vote_granting:grant_based_on_priority
- log:command_log
- log_structure:hash_chain
- commit:batch_commit
- recovery:state_transfer
- snapshot:periodic
- dynamic_membership:remove_node
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 41
- Elections Succeeded: 34
- Election Success Rate: 82.93%
- Messages Sent: 166
- Commits: 8
- Avg Messages/Commit: 20.75
- Leader Changes: 34
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 49
- Elections Succeeded: 43
- Election Success Rate: 87.76%
- Messages Sent: 329
- Commits: 20
- Avg Messages/Commit: 16.45
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 46
- Election Success Rate: 86.79%
- Messages Sent: 406
- Commits: 21
- Avg Messages/Commit: 19.33
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 62
- Elections Succeeded: 55
- Election Success Rate: 88.71%
- Messages Sent: 445
- Commits: 16
- Avg Messages/Commit: 27.81
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

