# ForgeConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.701793Z
**Run ID**: RUN-058
**Seed**: 1700000058

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: read_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: append_only_array
- Commit Method: majority_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: size_based

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: byzantine

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 119ms
- Election Timeout Base: 261ms
- Election Timeout Range: 257ms

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

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:read_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- log:replicated_log
- log_structure:append_only_array
- commit:majority_commit
- recovery:hybrid_recovery
- snapshot:size_based
- dynamic_membership:joint_consensus
- failure_detection:phi_accrual
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 63
- Elections Succeeded: 49
- Election Success Rate: 77.78%
- Messages Sent: 182
- Commits: 20
- Avg Messages/Commit: 9.10
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 43
- Election Success Rate: 81.13%
- Messages Sent: 237
- Commits: 12
- Avg Messages/Commit: 19.75
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 52
- Elections Succeeded: 49
- Election Success Rate: 94.23%
- Messages Sent: 344
- Commits: 20
- Avg Messages/Commit: 17.20
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 39
- Elections Succeeded: 39
- Election Success Rate: 100.00%
- Messages Sent: 430
- Commits: 18
- Avg Messages/Commit: 23.89
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

