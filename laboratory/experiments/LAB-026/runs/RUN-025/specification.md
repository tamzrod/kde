# NovaAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.966413Z
**Run ID**: RUN-025
**Seed**: 1700000025

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: append_only_array
- Commit Method: quorum_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: log_compaction

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: byzantine

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 376ms
- Election Timeout Base: 167ms
- Election Timeout Range: 94ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:state_machine
- log_structure:append_only_array
- commit:quorum_commit
- recovery:hybrid_recovery
- snapshot:log_compaction
- dynamic_membership:single_config
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 42
- Election Success Rate: 77.78%
- Messages Sent: 189
- Commits: 26
- Avg Messages/Commit: 7.27
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 62
- Elections Succeeded: 53
- Election Success Rate: 85.48%
- Messages Sent: 295
- Commits: 16
- Avg Messages/Commit: 18.44
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 61
- Elections Succeeded: 59
- Election Success Rate: 96.72%
- Messages Sent: 422
- Commits: 25
- Avg Messages/Commit: 16.88
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 51
- Election Success Rate: 89.47%
- Messages Sent: 509
- Commits: 22
- Avg Messages/Commit: 23.14
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

