# BastionSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.065791Z
**Run ID**: RUN-065
**Seed**: 1700000065

---

## Architecture

- Architecture: ring_based
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: state_transfer
- Snapshot Policy: size_based

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: crash_recovery

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 352ms
- Election Timeout Base: 239ms
- Election Timeout Range: 147ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
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
- voting:weighted_votes
- vote_granting:grant_based_on_priority
- log:replicated_log
- log_structure:append_only_array
- commit:index_based
- recovery:state_transfer
- snapshot:size_based
- dynamic_membership:single_config
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 64
- Elections Succeeded: 43
- Election Success Rate: 67.19%
- Messages Sent: 163
- Commits: 25
- Avg Messages/Commit: 6.52
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 66
- Elections Succeeded: 61
- Election Success Rate: 92.42%
- Messages Sent: 337
- Commits: 14
- Avg Messages/Commit: 24.07
- Leader Changes: 61
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 57
- Elections Succeeded: 51
- Election Success Rate: 89.47%
- Messages Sent: 385
- Commits: 24
- Avg Messages/Commit: 16.04
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 55
- Election Success Rate: 100.00%
- Messages Sent: 584
- Commits: 27
- Avg Messages/Commit: 21.63
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

