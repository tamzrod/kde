# NexusSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.813446Z
**Run ID**: RUN-041
**Seed**: 1700000041

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: batch_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: leader_change

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: crash_stop

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 213ms
- Election Timeout Base: 189ms
- Election Timeout Range: 278ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- log:hybrid
- log_structure:linked_list
- commit:batch_commit
- recovery:snapshot_transfer
- snapshot:leader_change
- dynamic_membership:add_node
- failure_detection:phi_accrual
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 55
- Elections Succeeded: 44
- Election Success Rate: 80.00%
- Messages Sent: 183
- Commits: 25
- Avg Messages/Commit: 7.32
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 57
- Elections Succeeded: 39
- Election Success Rate: 68.42%
- Messages Sent: 190
- Commits: 13
- Avg Messages/Commit: 14.62
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 53
- Election Success Rate: 100.00%
- Messages Sent: 462
- Commits: 26
- Avg Messages/Commit: 17.77
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 54
- Election Success Rate: 91.53%
- Messages Sent: 525
- Commits: 15
- Avg Messages/Commit: 35.00
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

