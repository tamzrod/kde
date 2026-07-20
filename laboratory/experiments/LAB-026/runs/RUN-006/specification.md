# AetherAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:44.971577Z
**Run ID**: RUN-006
**Seed**: 1700000006

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: leader_change

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: byzantine

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 441ms
- Election Timeout Base: 228ms
- Election Timeout Range: 292ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:random_winner
- concept:term_epochs
- voting:flexible_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- concept:majority_quorum
- log:replicated_log
- log_structure:hash_chain
- commit:batch_commit
- recovery:state_transfer
- snapshot:leader_change
- dynamic_membership:joint_consensus
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 58
- Elections Succeeded: 48
- Election Success Rate: 82.76%
- Messages Sent: 178
- Commits: 13
- Avg Messages/Commit: 13.69
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 66
- Elections Succeeded: 60
- Election Success Rate: 90.91%
- Messages Sent: 349
- Commits: 10
- Avg Messages/Commit: 34.90
- Leader Changes: 60
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 44
- Election Success Rate: 80.00%
- Messages Sent: 269
- Commits: 24
- Avg Messages/Commit: 11.21
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 49
- Elections Succeeded: 40
- Election Success Rate: 81.63%
- Messages Sent: 295
- Commits: 12
- Avg Messages/Commit: 24.58
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

